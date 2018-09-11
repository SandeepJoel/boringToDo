export install_variable="this is from install"
sudo apt-get install ack-grep
sudo dpkg-divert --local --divert /usr/bin/ack --rename --add /usr/bin/ack-grep
echo "[0]       create  build/content/en-US/freshdesk/scaling-support/agent-collision-detection/index.html.redirect
[0]       create  build/content/en-US/freshdesk/scaling-support/mobile-help-desk-management/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multi-lingual-global-helpdesk/index.html.redirect
[0]       create  build/content/en-US/freshdesk/freshchat/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/after-call-work/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/buy-phone-number/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/call-center-helpdesk/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/call-conferencing/index.html.redirect
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/call-lifetime-metric
[0]       create  build/content/en-US/freshdesk/multichannel-support/phone-support/call-lifetime-metric
[0]       create  build/content/en-US/collaboration-software/signup/index.html
[0]        error  build/content/en-US/404.html
[0]       create  build/content/en-US/sitemap.xml
" > log.txt
cat log.txt || ack 'create'
