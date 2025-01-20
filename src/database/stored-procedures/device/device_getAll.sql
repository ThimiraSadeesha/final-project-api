DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`device_getAll`(
)
BEGIN

    SELECT td.id           AS id,
           td.deviceId     AS deviceCode,
           td.type         AS type,
           td.deviceStatus AS status,
           td.vehicleId    AS vehicleId,
           td.userId       AS userId
    FROM tbl_device td;

END;
