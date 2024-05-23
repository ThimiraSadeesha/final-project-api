DROP PROCEDURE IF EXISTS `accident_detection_DB`.`vehicle_save`;
CREATE PROCEDURE `accident_detection_DB`.`vehicle_save`(
    IN p_vehicleNumber VARCHAR(255),
    IN p_manufactureYear INT,
    IN p_vehicleType VARCHAR(255),
    IN p_vehicleModel VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;
    INSERT INTO tbl_vehicle (vehicleNumber, manufactureYear, vehicleType,model)
    VALUES (p_vehicleNumber, p_manufactureYear, p_vehicleType,p_vehicleModel);

    SET @InsertedID = LAST_INSERT_ID();
    CALL vehicle_get(@InsertedID);
    COMMIT;

END;