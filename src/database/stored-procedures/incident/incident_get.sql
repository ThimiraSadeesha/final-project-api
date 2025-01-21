DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_get`;
CREATE PROCEDURE `accident_detection_DB`.`incident_get`(
    IN incidentId_val INT
)
BEGIN

    SELECT
        tn.id AS id,
        tn.severity AS severity,
        tn.location AS location,
        tn.time AS incidentTime,
        tn.incidentStatus AS incidentStatus,
        JSON_OBJECT(
                'id', td.id,
                'deviceId', td.deviceId,
                'type', td.type,
                'deviceStatus', td.deviceStatus,
                'lastMaintenance', td.lastMaintenance,
                'vehicleId', td.vehicleId,
                'userId', td.userId
        ) AS device,
        JSON_OBJECT(
                'id', tv.id,
                'vehicleNumber', tv.vehicleNumber,
                'manufactureYear', tv.manufactureYear,
                'vehicleType', tv.vehicleType,
                'model', tv.model
        ) AS vehicle,
        JSON_OBJECT(
                'id', tu.id,
                'userName', tu.userName,
                'fullName', tu.fullName,
                'nic', tu.nic,
                'contactNumber', tu.contactNumber,
                'gender', tu.gender,
                'city', tu.city,
                'district', tu.district,
                'province', tu.province,
                'userStatus', tu.userStatus,
                'email', tu.email
        ) AS user
    FROM
        tbl_incident tn
            LEFT JOIN
        tbl_device td ON tn.deviceId = td.id
            LEFT JOIN
        tbl_vehicle tv ON td.vehicleId = tv.id
            LEFT JOIN
        tbl_user tu ON td.userId = tu.id;

    COMMIT;
END
