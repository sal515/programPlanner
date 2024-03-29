## Setup Instructions

1. Install Node.js
2. Download & unzip MongoDb -- Download Link: https://downloads.mongodb.org/win32/mongodb-shell-win32-x86_64-2008plus-ssl-4.0.5.zip
3. Add MongoDb path to PATH environment variable
    --Set the system path to point to the mongodb bin folder. 
    
       (on win 10: press windowsButton + S --> navigate to environment variables --> navigate to path row and edit to add new path)
		{the path should be something similar to 
		"C:\Program Files\WebAppDependencies\mongodb-shell-win32-x86_64-2008plus-ssl-4.0.5\mongodb-win32-x86_64-2008plus-ssl-4.0.5\bin"}
		{does not matter where the directory is as long as the path is pointing to the bin of the downloaded folder}
4. Clone git repo using your IDE / GitKraken(preferred)
6. Install whatever package the IDE wants you to install (might show up on the bottom right of the IDE), say yes
5. Copy databaseSetting.js and duplicate the file with new name (call the new file databaseSetting.js !!!VERY IMPORTANT!!!) 
            
            To create new databases (as required) --> Change the data databaseURL String values to your "yourname"


![Alt text](images_for_instruction_files_only/InstructionScreenshot.png?raw=true "Title")

Note: To run the servers 

    FrontEnd-Server
    Use the Webstorm IDE run button 
           (check to make sure "ANGULAR CLI SERVER" is running in the drop down)
    
    BackEnd-Server
    In the Webstorm Terminal type "nodemon server.js" (without quotes)


## Populate your Database

1. start the backend server
2. go to localhost:3000/api/generateData/generateCoursesSchedules
3. go to localhost:3000/api/generateData/generateTestStudents
4. DO NOT REFRESH THE PAGES IT WILL CREATE DUPLICATES

## Updates March 24, 2019

1. The database setting were modified - copy the databaseSettingTemplate and write your db name for databaseURL
2. The endpoint to populate your db with dummy users has been added to the populate your database section
