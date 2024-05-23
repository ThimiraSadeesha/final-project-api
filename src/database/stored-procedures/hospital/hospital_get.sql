DROP PROCEDURE IF EXISTS `accident_detection_DB`.`hospital_get`;
CREATE PROCEDURE `accident_detection_DB`.`hospital_get`(
    IN p_hospitalId INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    SELECT id AS hospitalId,
           hospitalCode AS hospitalCode,
           hospitalName AS hospitalName,
           contactNumber AS contactNumber,
           city AS city,
           district AS district,
           province AS province,
           areaCovered AS coverdArea
    FROM tbl_hospital
    WHERE id = p_hospitalId;
END

