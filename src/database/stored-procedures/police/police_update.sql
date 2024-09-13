DROP PROCEDURE IF EXISTS `accident_detection_DB`.`police_update`;
CREATE PROCEDURE `accident_detection_DB`.`police_update`(
    IN p_policeId INT,
    IN p_policeCode VARCHAR(20),
    IN p_policeName VARCHAR(20),
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
    FROM tbl_police tp
    WHERE tp.id = p_policeId;
    IF @record_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
    ELSE IF @record_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
    ELSE

    UPDATE tbl_police
    SET
        policeCode = p_policeCode,
        policeName = p_policeName,
        contactNumber = p_contactNumber,
        city = p_city,
        district = p_district,
        province = p_province,
        areaCovered = p_areaCovered
    WHERE
        id = p_policeId;

    SET @InsertedID = LAST_INSERT_ID();
    select p_policeId;

    END IF;
    COMMIT;
    END IF;
END
