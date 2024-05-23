DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_config_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`device_config_getAll`(
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

    START TRANSACTION;

        SELECT tdc.id         AS roleId,
               tdc.configType   AS configType,
               tdc.deviceStatus AS deviceStatus,
               tdc.configBy AS configBy,
               tdc.deviceId AS deviceId

        FROM tbl_device_config tdc;
    COMMIT;

END;
