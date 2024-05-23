DROP PROCEDURE IF EXISTS `accident_detection_DB`.`role_get`;
CREATE PROCEDURE `accident_detection_DB`.`role_get`(
    IN role_Id INT
)
BEGIN
      DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

START TRANSACTION;

    SELECT COUNT(*) INTO @record_count FROM tbl_role tr WHERE tr.id = role_Id;
    IF @record_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Multiple records found. Please contact system administrator.';
    ELSE IF @record_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Records not found. Please contact system administrator.';
    ELSE
        SELECT tr.id         AS roleId,
               tr.roleName   AS roleName,
               tr.permission AS permission,
               tr.roleStatus AS roleStatus
        FROM tbl_role tr WHERE tr.id = role_Id;
    END IF;
    COMMIT;
    END IF;

END
