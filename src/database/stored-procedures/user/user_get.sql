DROP PROCEDURE IF EXISTS `accident_detection_DB`.`user_get`;
CREATE PROCEDURE `accident_detection_DB`.`user_get`(
    IN user_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;

        SELECT tu.id                                 AS userId,
               tu.userName                           AS userName,
               tu.fullName                           AS fullName,
               tu.nic                                AS nic,
               tu.contactNumber                      AS contactNumber,
               tu.email                              AS email,
               tu.gender                             AS gender,
               tu.address                            AS address,
               tu.city                               AS city,
               tu.district                           AS district,
               tu.province                           AS province,
               tu.userPassword                       AS userPassword,
               (SELECT JSON_OBJECT('roleId', tr.id, 'roleName', roleName, 'permission', permission, 'roleStatus',
                                   roleStatus)
                FROM tbl_role tr
                WHERE tr.id = tu.role_id)            AS role,
               (SELECT JSON_OBJECT('id', tv.id, 'vehicleNumber', tv.vehicleNumber, 'manufactureYear',
                                   tv.manufactureYear, 'vehicleType', tv.vehicleType, 'model', tv.model, 'createdAt',
                                   tv.createdAt)
                FROM tbl_vehicle tv
                WHERE tv.id = tu.vehicleId)          AS vehicle,
               (SELECT JSON_OBJECT('id', td.id, 'deviceId', td.deviceId, 'type', td.type, 'deviceStatus',
                                   td.deviceStatus, 'lastMaintenance', td.lastMaintenance, 'vehicleId', td.vehicleId,
                                   'userId', td.userId)
                FROM tbl_device td
                WHERE td.id = tu.deviceId)           AS device,
               (SELECT JSON_OBJECT('id', tep.id, 'personName', tep.personName, 'relation', tep.relation, 'address',
                                   tep.address, 'nic', tep.nic, 'contactNumber', tep.contactNumber, 'email', tep.email,
                                   'gender', tep.gender)
                FROM tbl_emergency_person tep
                WHERE tep.id = tu.emergencyPersonId) AS emergencyPerson,
               (SELECT JSON_OBJECT('id', tn.id, 'type', tn.type, 'message', tn.message, 'location', tn.location, 'time',
                                   tn.time, 'createdAt', tn.createdAt)
                FROM tbl_notification tn
                WHERE tn.id = tu.notificationId)     AS notifications
        FROM tbl_user tu
        WHERE tu.id = user_id;
    COMMIT;

END;
