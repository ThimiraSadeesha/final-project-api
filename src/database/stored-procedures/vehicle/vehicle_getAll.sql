DROP PROCEDURE IF EXISTS `accident_detection_DB`.`vehicle_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`vehicle_getAll`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

START TRANSACTION;
        SELECT id              AS vehicleId,
               vehicleNumber   AS vehicleNumber,
               manufactureYear AS manufactureYear,
               vehicleType     AS vehicleType,
               model           AS vehicleModel
        FROM tbl_vehicle;
    COMMIT;
END;
