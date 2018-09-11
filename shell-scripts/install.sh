export install_variable="this is from install"
echo "Installing ack-grep"
sudo apt-get install ack-grep
echo "[0]       create  build/content/en-US/freshdesk/scaling-support/agent-collision-detection/index.html.redirect
[0]       create  build/content/en-US/freshdesk/scaling-support/mobile-help-desk-management/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multi-lingual-global-helpdesk/index.html.redirect
[0]       create  build/content/en-US/freshdesk/freshchat/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/after-call-work/index.html.redirect
[0]       create  build/assets/images/en-US/ada.png
" > log.txt
echo "Testing ack-grep"
cat log.txt | ack 'error'
echo "Testing ack-grep full regex"
cat log.txt | ack '==|\b(create|update|error|delete)\b\s+(?!build\/(assets\/)?(images|thumbnails)|\s)'

