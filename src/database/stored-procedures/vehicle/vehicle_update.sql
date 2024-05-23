DROP PROCEDURE IF EXISTS `accident_detection_DB`.`vehicle_update`;
CREATE PROCEDURE `accident_detection_DB`.`vehicle_update`(
    IN p_vehicleId INT,
    IN p_vehicleNumber VARCHAR(255),
    IN p_manufactureYear INT,
    IN p_vehicleType VARCHAR(255),
    IN p_model VARCHAR(255)
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;

    SELECT COUNT(*) INTO @record_count FROM tbl_vehicle tv WHERE tv.id = p_vehicleId;
    IF @record_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
    ELSEIF @record_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
    ELSE
        UPDATE tbl_vehicle
        SET vehicleNumber = p_vehicleNumber,
            manufactureYear = p_manufactureYear,
            vehicleType = p_vehicleType,
            model = p_model
        WHERE id = p_vehicleId;

    END IF;

    COMMIT;
END;