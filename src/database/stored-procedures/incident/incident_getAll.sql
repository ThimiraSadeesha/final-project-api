DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`incident_getAll`()
BEGIN

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

    FROM tbl_incident tn
    ORDER BY id DESC;
    COMMIT;
END;