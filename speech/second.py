import whisper

model = whisper.load_model('large')
result = model.transcribe('testUkr.wav', fp16=False)
print(result['text'])
