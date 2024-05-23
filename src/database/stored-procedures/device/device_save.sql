DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_save`;
CREATE PROCEDURE `accident_detection_DB`.`device_save`(
    IN type_val VARCHAR (255),
    IN vehicleId_val INT,
    IN userId_val INT
)
BEGIN
    DECLARE device_id_number VARCHAR(50) DEFAULT '';

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

    START TRANSACTION;

    SELECT deviceId INTO @LAST_REFERENCE FROM tbl_device ORDER BY deviceId DESC LIMIT 1;
    SET @PREFIX = CONCAT('IOT', DATE_FORMAT(NOW(), '%Y%m/'));

    IF (@LAST_REFERENCE IS NULL) THEN
        SET device_id_number = CONCAT(@PREFIX,'001');
    ELSE
        SET @LAST_INDEX = REVERSE(SUBSTRING_INDEX(REVERSE(@LAST_REFERENCE), '/', 1));
        SET device_id_number = CONCAT(@PREFIX,LPAD(RIGHT(@LAST_INDEX,7)+1,7,'0'));
    END IF;

        INSERT INTO tbl_device (deviceId, type, vehicleId, userId)
        VALUES (device_id_number, type_val, vehicleId_val, userId_val);
--
    SET @InsertedID = LAST_INSERT_ID();
    CALL device_get(@InsertedID);
    COMMIT;

    END;