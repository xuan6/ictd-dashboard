
/* query the following data based on a given time frame*/

/*Average age of testing*/
-- avgAgePerState:
SELECT [MorGResidingRegionState], AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [MorGResidingRegionState];

-- avgAgePerTown
SELECT [MorGResidingGTownShip], AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [MorGResidingGTownShip];

-- avgAgePerProvince
SELECT [ProvinceName],AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [ProvinceName];

/*specify avg age by lab*/
-- avgAgeNHL:
SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = [NHL];

-- avgAgePHL:
SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = [PHL];

-- avgAgeUNION:
SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = [UNION];

-- avgAgePerLab:
SELECT [Lab], AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [lab];

/*specify avg age by facility*/
-- avgAgePerFacilityName
SELECT [FacilityName],AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [FacilityName];

-- avgAgePerFacilityType
SELECT [FacilityTyp],AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] GROUP BY [FacilityTyp];




/*Total number of EID test done with number positive results, rejected samples, indeterminate results
*/
-- eidTestResultTotal:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] GROUP BY [FinalReportResult];

/*specify result by lab*/
-- eidTestResultNHL:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = [NHL] GROUP BY [FinalReportResult];

-- eidTestResultPHL:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = [PHL] GROUP BY [FinalReportResult];

-- eidTestResultUNION:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = [UNION] GROUP BY [FinalReportResult];

/*specify result by facility type*/
-- eidTestResultAIDST:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [AIDS/STD Team] GROUP BY [FinalReportResult];

-- eidTestResultAMI:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [AMI] GROUP BY [FinalReportResult];

-- eidTestResultDisH:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [District Hospital] GROUP BY [FinalReportResult];

-- eidTestResultGenH:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [General Hospital] GROUP BY [FinalReportResult];

-- eidTestResultMSFH:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [MSF-H] GROUP BY [FinalReportResult];


-- eidTestResultNHL:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [National Health Laboratory] GROUP BY [FinalReportResult];


-- eidTestResultSpH:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [Specialist Hospital] GROUP BY [FinalReportResult];

-- eidTestResultSRH:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [State/Regional Hospital] GROUP BY [FinalReportResult];

-- eidTestResultTH:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [Township Hospital] GROUP BY [FinalReportResult];


/*Laboratory Turnaround Time (TAT) for facilities and laboratories
5 phases
collect - ship
ship - receive
receive - register
register - report
report - dispatch
*/
-- avgTatTotal:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery];

/*specify tat by lab*/
-- avgTatNHL:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = [NHL];

-- avgTatPHL:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = [PHL];

-- avgTatUNION:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = [UNION];



/*specify tat by facility type*/
-- avgTatAIDST:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [AIDS/STD Team];

-- avgTatAMI:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [AMI];

-- avgTatDisH:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [District Hospital];

-- avgTatGenH:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [General Hospital];

-- avgTatMSFH:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [MSF-H];

-- avgTatNHL:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [National Health Laboratory];

-- avgTatSpH:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [Specialist Hospital];

-- avgTatSRH:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [State/Regional Hospital];

-- avgTatTH:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [FacilityTyp] = [Township Hospital];


/*Track each sample
1 result
6 dates
5 phases
collect - ship
ship - receive
receive - register
register - report
report - dispatch
*/
-- trackSample:
SELECT [ID], [FinalReportResult],[SampleCollectedDate], [SampleShipmentDate],[RecievedDate],[RegistrationDate], [FinalReportDate],[DispachedDate], DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate]),DATEDIFF(day,[SampleShipmentDate],[RecievedDate]),DATEDIFF(day,[RecievedDate],[RegistrationDate]),DATEDIFF(day,[RegistrationDate],[FinalReportDate]), DATEDIFF(day,[FinalReportDate],[DispachedDate]) FROM [dbo].[EIDSummery];
