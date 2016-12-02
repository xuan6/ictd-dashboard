/*specify avg age by lab*/
-- avgAgeNHL:
SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = [NHL];

-- avgAgePHL:
SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = [PHL];

-- avgAgeUNION:
SELECT AVG(([Age]+[ageinweeks]/52)) FROM [dbo].[EIDSummery] WHERE [Lab] = [UNION];

-- eidTestResultNHL:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = [NHL] GROUP BY [FinalReportResult];

-- eidTestResultPHL:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = [PHL] GROUP BY [FinalReportResult];

-- eidTestResultUNION:
SELECT [FinalReportResult], COUNT([ID]) AS [NumberOfResults]FROM [dbo].[EIDSummery] WHERE [Lab] = [UNION] GROUP BY [FinalReportResult];

/*specify tat by lab*/
-- avgTatNHL:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = [NHL];

-- avgTatPHL:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = [PHL];

-- avgTatUNION:
SELECT AVG(DATEDIFF(day,[SampleCollectedDate],[SampleShipmentDate])),AVG(DATEDIFF(day,[SampleShipmentDate],[RecievedDate])),AVG(DATEDIFF(day,[RecievedDate],[RegistrationDate])),AVG(DATEDIFF(day,[RegistrationDate],[FinalReportDate])),AVG(DATEDIFF(day,[FinalReportDate],[DispachedDate])) FROM [dbo].[EIDSummery] WHERE [Lab] = [UNION];
