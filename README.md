# snowflakes

![snowflakes](https://user-images.githubusercontent.com/54733637/148814830-22d74c4a-3984-47e0-86fb-df2fa9e146ed.gif)

little snowflakes

___

# Install Emscripten
1. 다음 링크 참고하여 설치 및 활성화 진행
- https://emscripten.org/docs/getting_started/downloads.html

2. `emcc` 명령어 사용할 수 있는지 확인
```sh
emcc --version
```
- `emcc`가 사용 가능한 상태라면 다음과 같이 떠야 됨.
<img src="https://private-user-images.githubusercontent.com/54733637/425792432-99a3e0f6-0055-473e-9cf7-ca6b08580864.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI2OTc4MjEsIm5iZiI6MTc0MjY5NzUyMSwicGF0aCI6Ii81NDczMzYzNy80MjU3OTI0MzItOTlhM2UwZjYtMDA1NS00NzNlLTljZjctY2E2YjA4NTgwODY0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzIzVDAyMzg0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThiOTU1ZmZmMDdkOWRkNmZkMjg4NDY5Nzk2NzNjNDNkOWZiYjEwMzEzMWUxOWYwNTIxODFjYTA4M2UwODU4ODgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.9MPNu_PKy3C14OwdiaOz-fhFzXdoAFdySlt9vC-k2Bg" width=300>
- `emcc: command not found`라고 뜬다면:
  - [Emscripten 설치 안내 문서](https://emscripten.org/docs/getting_started/downloads.html)에 안내된 대로 본인 운영체제/터미널에 맞는 명령어를 제대로 입력했는지 체크
  - `emcc: command not found`로 구글링해서 트러블슈팅 사례 참고하기
    - 예) https://pi-314.tistory.com/108

# Build WASM
```sh
emcc snowflakes.c -o snowflakes.js -sEXPORTED_FUNCTIONS=_init_snowflakes,_update_snowflakes,_get_snowflakes -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -s SIDE_MODULE=0
```