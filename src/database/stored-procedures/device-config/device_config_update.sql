DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_config_update`;
CREATE PROCEDURE `accident_detection_DB`.`device_config_update`(
    IN p_configId INT,
    IN p_configType VARCHAR(255),
    IN p_deviceStatus VARCHAR(15),
    IN p_configBy VARCHAR(255),
    IN p_deviceId INT
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
    FROM tbl_device_config td
    WHERE td.id = p_configId;
    IF @record_count > 1 THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
    ELSE IF @record_count = 0 THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
    ELSE
    UPDATE tbl_device_config
    SET
        configType = p_configType,
        deviceStatus = p_deviceStatus,
        configBy = p_configBy,
        deviceId = p_deviceId
    WHERE id = p_configId;
    END IF;
    COMMIT;
    END IF;
   SET @InsertedID = LAST_INSERT_ID();
    CALL device_config_get(@InsertedID);
    END