import os
import tempfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from faster_whisper import WhisperModel


# Model sẽ load 1 lần khi server start
MODEL_SIZE = os.getenv('WHISPER_MODEL', 'base')
model = WhisperModel(MODEL_SIZE, device='cpu', compute_type='int8')


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def transcribe_audio(request):
    file = request.FILES.get('audio')
    if not file:
        return JsonResponse({'error': "Thiếu file 'audio'."}, status=400)

    language = request.POST.get('language')
    if language == 'auto':
        language = None


    # Lưu tạm file
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.name)[1]) as tmp:
        for chunk in file.chunks():
            tmp.write(chunk)
        tmp_path = tmp.name

    try:
        segments, info = model.transcribe(
        tmp_path,
        language=language,
        beam_size=5,
        vad_filter=True,
        )
        seg_list = []
        for seg in segments:
            seg_list.append({
                'start': round(seg.start, 2) if seg.start is not None else None,
                'end': round(seg.end, 2) if seg.end is not None else None,
                'text': seg.text.strip(),
            })
        full_text = ' '.join(s['text'] for s in seg_list).strip()
        return JsonResponse({
            'text': full_text,
            'language': getattr(info, 'language', None),
            'language_probability': getattr(info, 'language_probability', None),
            'segments': seg_list,
        })
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass