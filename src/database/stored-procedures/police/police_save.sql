DROP PROCEDURE IF EXISTS `accident_detection_DB`.`police_save`;
CREATE PROCEDURE `accident_detection_DB`.`police_save`(
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

    INSERT INTO tbl_police (policeCode, policeName,contactNumber, city, district, province, areaCovered)
    VALUES (p_policeCode,p_policeName, p_contactNumber, p_city, p_district, p_province, p_areaCovered);

    COMMIT;
    SET @InsertedID = LAST_INSERT_ID();
    CALL police_get(@InsertedID);
END;