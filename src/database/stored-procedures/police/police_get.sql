DROP PROCEDURE IF EXISTS `accident_detection_DB`.`police_get`;
CREATE PROCEDURE `accident_detection_DB`.`police_get`(
    IN policeId_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;
    SELECT
        tp.id AS policeId,
        tp.policeName AS PoliceName,
        tp.policeCode AS PoliceCode,
        tp.contactNumber As contactNumber,
        tp.city AS city,
        tp.district AS district,
        tp.province AS province,
        tp.areaCovered AS areaCovered

    FROM tbl_police tp WHERE tp.id=policeId_val;

    COMMIT ;
END
