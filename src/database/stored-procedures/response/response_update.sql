DROP PROCEDURE IF EXISTS `accident_detection_DB`.`response_update`;
CREATE PROCEDURE `accident_detection_DB`.`response_update`(
    IN responseId_val INT,
    IN timestamp_val TIMESTAMP,
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
        SELECT COUNT(*)
        INTO @record_count
        FROM tbl_response tr
        WHERE tr.id = responseId_val;
        IF @record_count > 1 THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
        ELSE IF @record_count = 0 THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
        ELSE


            UPDATE tbl_response
            SET
                `timestamp` = timestamp_val,
                responseStatus = responseStatus_val,
                responseTime = responseTime_val,
                incidentId = incidentId_val,
                policeDepartmentId = policeDepartmentId_val,
                fireDepartmentId = fireDepartmentId_val,
                hospitalDepartmentId = hospitalDepartmentId_val
            WHERE
                id = responseId_val;
        END IF;
        COMMIT;
        END IF;

SET @InsertedID = LAST_INSERT_ID();
CALL response_get(@InsertedID);



END;