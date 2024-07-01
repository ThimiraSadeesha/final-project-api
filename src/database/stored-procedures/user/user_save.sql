DROP PROCEDURE IF EXISTS `accident_detection_DB`.`user_save`;
CREATE PROCEDURE `accident_detection_DB`.`user_save`(
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
    IN role_val INT,
    IN vehicles_val INT,
    IN emergencyPersons_val INT,
    IN devices_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;

    SELECT COUNT(*) INTO @record_count FROM tbl_user tu WHERE tu.userName = userName_val;
    IF @record_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is already exist.';
    END IF;
    INSERT INTO tbl_user (userName, fullName, nic, contactNumber, email, gender, address, city, district,
                          province, userPassword,role_id, vehicleId, deviceId, emergencyPersonId)
    VALUES (userName_val, fullName_val, nic_val, contactNumber_val, email_val, gender_val, address_val, city_val,
            district_val, province_val, userPassword_val, role_val,vehicles_val,devices_val,emergencyPersons_val);
    SET @InsertedID = LAST_INSERT_ID();
    CALL user_get(@InsertedID);
    COMMIT;

END;