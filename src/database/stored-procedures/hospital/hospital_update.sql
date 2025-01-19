DROP PROCEDURE IF EXISTS `accident_detection_DB`.`hospital_update`;
CREATE PROCEDURE `accident_detection_DB`.`hospital_update`(
    IN p_hospitalId INT,
    IN p_hospitalCode VARCHAR(20),
    IN p_hospitalName VARCHAR(255),
    IN p_contactNumber VARCHAR(20),
    IN p_city VARCHAR(100),
    IN p_district VARCHAR(100),
    IN p_province VARCHAR(100),
    IN p_areaCovered VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
            ROLLBACK;
        END;

    START TRANSACTION;
    SELECT COUNT(*)
    INTO @record_count
    FROM tbl_hospital th
    WHERE th.id = p_hospitalId;

    IF @record_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
    ELSE IF @record_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
    ELSE



        UPDATE tbl_hospital
    SET
        hospitalCode = p_hospitalCode,
        hospitalName = p_hospitalName,
        contactNumber = p_contactNumber,
        city = p_city,
        district = p_district
#         province = p_province
    WHERE
        id = p_hospitalId;

        select p_hospitalId;

    END IF;
    COMMIT;
    END IF;
END
