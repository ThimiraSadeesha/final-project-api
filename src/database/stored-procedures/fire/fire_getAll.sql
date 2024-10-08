DROP PROCEDURE IF EXISTS `accident_detection_DB`.`fire_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`fire_getAll`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

    START TRANSACTION;
        SELECT id            AS hospitalId,
               fireCode      AS firelCode,
               fireName     AS fireName,
               contactNumber AS contactNumber,
               city          AS city,
               district      AS district,
               province      AS province,
               areaCovered   AS coverdArea
        FROM tbl_fire;
    COMMIT;
END;