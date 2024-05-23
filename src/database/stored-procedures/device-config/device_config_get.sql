DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_config_get`;
CREATE PROCEDURE `accident_detection_DB`.`device_config_get`(
    IN id_val INT
)
BEGIN
      DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;

        SELECT COUNT(*) INTO @record_count FROM tbl_device_config tdc WHERE tdc.id = id_val;
        IF @record_count > 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Multiple records found. Please contact system administrator.';
        ELSE IF @record_count = 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Records not found. Please contact system administrator.';
        ELSE
            SELECT tdc.id         AS roleId,
                   tdc.configType   AS configType,
                   tdc.deviceStatus AS deviceStatus,
                   tdc.configBy AS configBy,
                   (SELECT JSON_OBJECT('id', td.id, 'deviceId', td.deviceId, 'type', td.type, 'deviceStatus',
                                       td.deviceStatus, 'lastMaintenance', td.lastMaintenance, 'vehicleId', td.vehicleId,
                                       'userId', td.userId)
                    FROM tbl_device td
                    WHERE td.id = tdc.deviceId)           AS device
            FROM tbl_device_config tdc WHERE tdc.id = id_val;
    END IF;
        COMMIT;
            END IF;
END
