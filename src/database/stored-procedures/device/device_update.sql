DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_update`;
CREATE PROCEDURE `accident_detection_DB`.`device_update`(
    IN id_val INT,
    IN deviceId_val VARCHAR(50),
    IN type_val VARCHAR(255),
    IN status_val VARCHAR(255),
    IN vehicleId_val INT,
    IN userId_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    ROLLBACK;
 END;

    START TRANSACTION;
    SELECT COUNT(*)
    INTO @record_count
    FROM tbl_device td
    WHERE td.id = id_val;
        IF @record_count > 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
        ELSE IF @record_count = 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
        ELSE
            UPDATE tbl_device
            SET deviceId = deviceId_val,
                type = type_val,
                deviceStatus = status_val,
                vehicleId = vehicleId_val,
                userId = userId_val
            WHERE id = id_val;
        END IF;
COMMIT;
END IF;
    SET @InsertedID = LAST_INSERT_ID();
CALL device_get(@InsertedID);
END