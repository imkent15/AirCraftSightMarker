# AirCraftSightMarker
AirCraftSightMarker


This is a Sample Application for learning purpose.



Deployment Guidelines
Verify the DB Connection Configurations in the appsettings file
Update the user name and password with a valid user with privileges to create database. (Eg : sysadmin)

Migrations are generated and available wiht the source. hence no need to issue the below command (dotnet ef migrations add InitialCreate)
However the below command to update the database is required to create database and required tables.

dotnet ef database update

The above is not handled via code as this is a one time deployment procedure in the real world scenario.


# Possible Enhancements
Authentication Module
Logging Framework
unit testing
e2e testing
API Documentation

# Basic Perf Enhancements
Async Tasks 
Handle large amount of data
Push down filters to backend
Pagination
Resizing images



