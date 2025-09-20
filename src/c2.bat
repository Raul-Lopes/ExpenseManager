@ECHO OFF
SETLOCAL

SET "output_file=all_ts_files.txt"

REM Clear the output file if it exists
IF EXIST "%output_file%" DEL "%output_file%"

REM Loop through all files recursively
FOR /R %%F IN (*.*) DO (
    ECHO --- >> "%output_file%"
    ECHO FILE: %%F >> "%output_file%"
    ECHO --- >> "%output_file%"
    TYPE "%%F" >> "%output_file%"
    ECHO. >> "%output_file%" REM Add an extra blank line for separation
)

ECHO Concatenation complete. Output saved to %output_file%
ENDLOCAL