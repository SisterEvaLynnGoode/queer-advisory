@echo off
:: Converts the source video into the three files the hero scrub needs.
:: Usage: drag-and-drop the source .mp4 onto this file,
::        or run:  prep_scrub_video.bat "C:\path\to\source.mp4"

set FFMPEG=C:\Users\tgbed\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe
set SRC=%~1
set OUT=%~dp0public\hero

if "%SRC%"=="" (
  echo ERROR: Drag the source video onto this .bat file, or pass it as an argument.
  pause
  exit /b 1
)

echo Source: %SRC%
echo Output: %OUT%
echo.

echo [1/3] Extracting poster frame (t=0.5s)...
"%FFMPEG%" -y -ss 0.5 -i "%SRC%" -vframes 1 -q:v 2 "%OUT%\queer_friendly_school_poster.jpg"

echo [2/3] Encoding scrub-ready MP4...
"%FFMPEG%" -y -i "%SRC%" -c:v libx264 -profile:v baseline -level 3.1 -crf 23 -preset fast -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" -an -movflags +faststart "%OUT%\queer_friendly_school_scrub.mp4"

echo [3/3] Encoding scrub-ready WebM (slower - VP9)...
"%FFMPEG%" -y -i "%OUT%\queer_friendly_school_scrub.mp4" -c:v libvpx-vp9 -crf 33 -b:v 0 -deadline good -cpu-used 2 -an "%OUT%\queer_friendly_school_scrub.webm"

echo.
echo Done. Files written to %OUT%
dir "%OUT%"
pause
