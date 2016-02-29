// Git notes
Starting on the master branch:
 1) git checkout -b catalog (creates new branch called catalog and switches to it)
 
Do some work...
 2) git add .
 3) git commit -m "msg"
 
Before pushing...
 4) git checkout master ( switch back to master branch)
 5) git pull origin master (pull any work that has been placed on remote master)
 6) git checkout catalog (switch back to working branch)
 7) git merge master (adds works from master to your catalog branch)
 
Ready to push...
 8) git push origin catalog (pushes catalog branch to github as "catalog" branch";

// Deleting your branch
git branch -D branchname
git push origin :branchname (: signifies delete)

// STEPH CURRY SAAAAN
