DROP PROCEDURE IF EXISTS `accident_detection_DB`.`response_get`;
CREATE PROCEDURE `accident_detection_DB`.`response_get`(
    IN responseId_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
END;

START TRANSACTION;

SELECT
    tr.id AS responseId,
    tr.timestamp AS time,
    tr.responseTime AS responseTime,
    tr.incidentId AS incidentId,
    tr.fireDepartmentId AS fire,
    tr.hospitalDepartmentId AS hospital,
    tr.policeDepartmentId AS police
FROM tbl_response tr WHERE tr.id=responseId_val;

COMMIT;
END