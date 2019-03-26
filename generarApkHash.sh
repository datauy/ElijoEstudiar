cd /home/lito/PorMiBarrioAPPs/
keytool -exportcert -alias alias_name -keystore ./pmbdev.keystore | openssl sha1 -binary | openssl base64
