DROP PROCEDURE IF EXISTS `accident_detection_DB`.`vehicle_get`;
CREATE PROCEDURE `accident_detection_DB`.`vehicle_get`(
    IN vehicle_id INT
)
BEGIN
    DECLARE v_vehicleNumber VARCHAR(255);
    DECLARE v_manufactureYear INT;
    DECLARE v_vehicleType VARCHAR(255);
    DECLARE v_model VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION

        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;

    SELECT vehicleNumber AS vehicleNumber, manufactureYear AS Year, vehicleType AS type, model AS model

    FROM tbl_vehicle
    WHERE id = vehicle_id;

    IF (FOUND_ROWS() > 0) THEN
        SELECT v_vehicleNumber, v_manufactureYear, v_vehicleType, v_model;
    ELSE
        SELECT 'Error: Vehicle not found for the given ID' AS error_message;
    END IF;

    COMMIT;
END;

