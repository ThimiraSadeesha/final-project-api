DROP PROCEDURE IF EXISTS `accident_detection_DB`.`role_update`;
CREATE PROCEDURE `accident_detection_DB`.`role_update`(
    IN p_roleId INT,
    IN p_roleName VARCHAR (255),
    IN p_permission VARCHAR (255),
    IN p_roleStatus VARCHAR (50)
)
BEGIN
    DECLARE rows_affected INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
            ROLLBACK;
    END;

    START TRANSACTION;
                SELECT COUNT(*)
                INTO @record_count
                FROM tbl_role tr
                WHERE tr.id = p_roleId;
            IF @record_count > 1 THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
                ELSE IF @record_count = 0 THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
            ELSE

            UPDATE tbl_role
            SET roleName   = p_roleName,
                permission = p_permission,
                roleStatus = p_roleStatus
            WHERE id = p_roleId;

            END IF;
                COMMIT;
            END IF;
    SET @InsertedID = LAST_INSERT_ID();
            CALL role_get(@InsertedID);

END
