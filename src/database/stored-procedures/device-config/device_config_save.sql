DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_config_save`;
CREATE PROCEDURE `accident_detection_DB`.`device_config_save`(
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
        END;

    START TRANSACTION;

INSERT INTO tbl_device_config (configType, deviceStatus, configBy, deviceId)
VALUES (p_configType, p_deviceStatus, p_configBy, p_deviceId);

    SET @InsertedID = LAST_INSERT_ID();
    CALL device_config_get(@InsertedID);
COMMIT;

END;