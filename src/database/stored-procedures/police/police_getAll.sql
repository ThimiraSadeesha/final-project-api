DROP PROCEDURE IF EXISTS `accident_detection_DB`.`police_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`police_getAll`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
END;

START TRANSACTION;
        SELECT
            tp.id AS policeId,
            tp.policeCode AS PoliceCode,
            tp.policeName AS PoliceName,
            tp.contactNumber As contactNumber,
            tp.city AS city,
            tp.district AS district,
            tp.province AS province,
            tp.areaCovered AS areaCovered

            FROM tbl_police tp  ORDER BY id DESC;
COMMIT ;
    END;