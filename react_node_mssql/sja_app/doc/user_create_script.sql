use Learning_Hub;

-- Create a table to store user information
CREATE TABLE users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    user_first_name NVARCHAR(50),
    user_last_name NVARCHAR(50),
    dob DATE,
    status NVARCHAR(20)
);
GO