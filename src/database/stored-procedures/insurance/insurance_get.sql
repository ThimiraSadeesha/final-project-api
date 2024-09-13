DROP PROCEDURE IF EXISTS `accident_detection_DB`.`insurance_get`;
CREATE PROCEDURE `accident_detection_DB`.`insurance_get`(
    IN p_insuranceId INT
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET DIAGNOSTICS CONDITION 1
    @sqlstate = RETURNED_SQLSTATE,
    @errno = MYSQL_ERRNO,
    @message_text = MESSAGE_TEXT;
SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
END;


SELECT id            AS insuranceId,
       insuranceCode  AS insuranceCode,
       insuranceName  AS insuranceName,
       contactNumber  AS contactNumber,
       city           AS city,
       district       AS district,
       province       AS province,
       areaCovered    AS coveredArea
FROM tbl_insurance
WHERE id = p_insuranceId;
END;
