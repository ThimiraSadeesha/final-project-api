DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`incident_getAll`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

    START TRANSACTION;
        SELECT tn.id                       AS id,
               tn.severity                 AS serverity,
               tn.location                 AS location,
               tn.time                     AS incidentTime,
               tn.incidentStatus           AS incidentStatus,
               (SELECT JSON_OBJECT('id', td.id, 'deviceId', td.deviceId, 'type', td.type, 'deviceStatus',
                                   td.deviceStatus, 'lastMaintenance', td.lastMaintenance, 'vehicleId', td.vehicleId,
                                   'userId', td.userId)
                FROM tbl_device td
                WHERE td.id = tn.deviceId) AS device

        FROM tbl_incident tn;
    COMMIT;
END;