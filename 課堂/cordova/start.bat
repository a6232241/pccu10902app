set dirName=WebSQL
set appName=com.pccu.websql
set appTitle=%appName%


::cordova create %dirName% %appName% %appTitle%

::xcopy .\build .\%dirName%\www /s /e /y

cd .\%dirName%
cordova platform add browser
cordova platform add android


pause