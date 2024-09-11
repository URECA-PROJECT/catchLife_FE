### Git 연결

1. 레포지토리 클론하기 (프로젝트 생성하고 싶은 폴더에서) `git clone https://github.com/URECA-PROJECT/catchLife_FE.git`
2. 연결된 저장소 확인 (프로젝트 폴더로 이동한 후, 터미널에서) `git remote -v`
    1. 연결되어 있으면 연결 끊기 `git remote remove origin` (`origin`이 일반적인 이름인데, `git remote -v` 했을 때 맨 왼쪽에 적혀있는거, 다른 이름(`upstream` 등)이 사용된 경우 그 이름 사용!)
3. 새 저장소 연결하기 `git remote add origin https://github.com/URECA-PROJECT/catchLife_FE.git`
4. 확인 `git remote -v` 하고 아래처럼 적혀있으면 굿굿

```jsx
origin  https://github.com/URECA-PROJECT/catchLife_FE.git (fetch)
origin  https://github.com/URECA-PROJECT/catchLife_FE.git (push)
```

---

### GIT 활용

1. 변경사항 생기면 `git add .`  으로 스테이징하고 ( `.` : 모든 변경사항 스테이징, 파일만 할 수도 있긴 해)
2. `git commit -m ‘Feat: 00 기능 추가’` : 깃에 남길 메세지 작성 (변경된 코드 간략히 설명)
3. `git push origin [branch]` : `[branch]`는 현재 작업 중인 브랜치 이름
