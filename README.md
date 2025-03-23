<img width="293" alt="image" src="https://github.com/user-attachments/assets/91de7aeb-de0b-4ad1-9dfd-0565993376cd" /># snowflakes

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

    ![image](https://github.com/user-attachments/assets/4d487571-d2c3-4615-9845-96dc2b84a607)
  
  - `emcc: command not found`라고 뜬다면:
    - [Emscripten 설치 안내 문서](https://emscripten.org/docs/getting_started/downloads.html)에 안내된 대로 본인 운영체제/터미널에 맞는 명령어를 제대로 입력했는지 체크
    - `emcc: command not found`로 구글링해서 트러블슈팅 사례 참고하기
      - 예) https://pi-314.tistory.com/108
     
  - 명령어 입력한 뒤 다음과 같이 `Python`이라고 나온다면(Windows Git Bash):

    <img width="300" alt="image" src="https://github.com/user-attachments/assets/a7e2b8b2-b10e-4208-9cf2-d7adaa81a216" />

    1. '앱 실행 별칭 관리'로 들어가기

        <img width="293" alt="image" src="https://github.com/user-attachments/assets/39164e8c-5c27-4713-a7cf-463f2ea01305" />\
       
    2. 다음 옵션들 켜져있다면 끄기
   
       <img width="310" alt="image" src="https://github.com/user-attachments/assets/35c28928-f675-4c22-8d06-ac73e452f952" />

# Build WASM
```sh
emcc snowflakes.c -o snowflakes.js -sEXPORTED_FUNCTIONS=_init_snowflakes,_update_snowflakes,_get_snowflakes -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -s SIDE_MODULE=0
```
