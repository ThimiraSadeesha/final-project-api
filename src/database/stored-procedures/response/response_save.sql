DROP PROCEDURE IF EXISTS `accident_detection_DB`.`response_save`;
CREATE PROCEDURE `accident_detection_DB`.`response_save`(
    IN responseStatus_val VARCHAR (255),
    IN responseTime_val INT,
    IN incidentId_val INT,
    IN policeDepartmentId_val INT,
    IN fireDepartmentId_val INT,
    IN hospitalDepartmentId_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        ROLLBACK;
    END;

START TRANSACTION;

INSERT INTO tbl_response ( responseStatus, responseTime, incidentId, policeDepartmentId, fireDepartmentId,
                          hospitalDepartmentId)
        VALUES ( responseStatus_val, responseTime_val, incidentId_val, policeDepartmentId_val,
        fireDepartmentId_val, hospitalDepartmentId_val);

SET @InsertedID = LAST_INSERT_ID();
CALL response_get(@InsertedID);

COMMIT;
    END;