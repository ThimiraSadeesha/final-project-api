DROP PROCEDURE IF EXISTS `accident_detection_DB`.`user_update`;
CREATE PROCEDURE `accident_detection_DB`.`user_update`(
    IN userId_val INT,
    IN userName_val VARCHAR(255),
    IN fullName_val VARCHAR(255),
    IN nic_val VARCHAR(50),
    IN contactNumber_val VARCHAR(15),
    IN email_val VARCHAR(50),
    IN gender_val VARCHAR(20),
    IN address_val VARCHAR(255),
    IN city_val VARCHAR(255),
    IN district_val VARCHAR(255),
    IN province_val VARCHAR(255),
    IN userPassword_val VARCHAR(255),
    IN userStatus_val VARCHAR(255),
    IN role_val INT,
    IN vehicles_val INT,
    IN emergencyPersons_val INT,
    IN devices_val INT,
    IN notifications_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;
    SELECT COUNT(tc.id) INTO @customer_count FROM tbl_user tc WHERE tc.id = userId_val;

    IF @customer_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found (customer). Please contact system administrator.';
    ELSEIF @customer_count < 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found (customer). Please contact system administrator.';
    END IF;

    UPDATE tbl_user
    SET
        userName=userName_val,
        fullName = fullName_val,
        nic = nic_val,
        contactNumber = contactNumber_val,
        email = email_val,
        gender = gender_val,
        address = address_val,
        city = city_val,
        district = district_val,
        province = province_val,
        userPassword = userPassword_val,
        userStatus = userStatus_val,
        role_id = role_val,
        vehicleId = vehicles_val,
        deviceId = devices_val,
        emergencyPersonId = emergencyPersons_val,
        notificationId = notifications_val
    WHERE
        id = userId_val;
COMMIT ;

END;