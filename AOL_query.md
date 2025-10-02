
```sql
-- For each unique parent area of law, show first 10 legal issue descriptions from answers tasks 
-- - Extract issues from tasks (location depends on questionnaire)
-- - Get area of law from service request
-- - Map each area of law to its parent

WITH ranked_answers AS (
  SELECT
    a.questionnaire_name,
    a.created_at as created_at,
    a.id as id_of_answer,
    sr.area_of_law as area_of_law,
    CASE
      WHEN a.questionnaire_name ILIKE 'auto-accident%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'bankruptcy%' THEN GET_PATH (PARSE_JSON (tasks), 'task11.textArea1')
      WHEN a.questionnaire_name ILIKE 'billing-dispute%' THEN GET_PATH (PARSE_JSON (tasks), 'task5.textArea1')
      WHEN a.questionnaire_name ILIKE 'business%' THEN GET_PATH (PARSE_JSON (tasks), 'task2.textArea')
      WHEN a.questionnaire_name ILIKE 'civil-litigation%' THEN GET_PATH (PARSE_JSON (tasks), 'task2.textArea')
      WHEN a.questionnaire_name ILIKE 'collections%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'consumer-rights%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'contract-review%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea')
      WHEN a.questionnaire_name ILIKE 'contracts%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'criminal%' THEN GET_PATH (PARSE_JSON (tasks), 'task5.textArea')
      WHEN a.questionnaire_name ILIKE 'employment%' THEN GET_PATH (PARSE_JSON (tasks), 'task2.textArea')
      WHEN a.questionnaire_name ILIKE 'estate-planning%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'family-law%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'immigration%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea')
      WHEN a.questionnaire_name ILIKE 'insurance%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea1')
      WHEN a.questionnaire_name ILIKE 'landlord-tenant%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea')
      WHEN a.questionnaire_name ILIKE 'landlord-v%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea')
      WHEN a.questionnaire_name ILIKE 'partner%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea')
      WHEN a.questionnaire_name ILIKE 'personal-injury%' THEN GET_PATH (PARSE_JSON (tasks), 'task3.textArea')
      WHEN a.questionnaire_name ILIKE 'real-estate%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
      WHEN a.questionnaire_name ILIKE 'traffic%' THEN GET_PATH (PARSE_JSON (tasks), 'task1.textArea')
    END AS issue,
    CASE
        WHEN sr.area_of_law = 'AA' THEN 'Automobile Accident'
        WHEN sr.area_of_law = 'AD' THEN 'Adoption'
        WHEN sr.area_of_law = 'AF' THEN 'Affidavit'
        WHEN sr.area_of_law = 'AM' THEN 'Administrative Law'
        WHEN sr.area_of_law = 'BD' THEN 'Billing Disputes'
        WHEN sr.area_of_law = 'BK' THEN 'Banking'
        WHEN sr.area_of_law = 'BR' THEN 'Bankruptcy'
        WHEN sr.area_of_law = 'BS' THEN 'Business license, fees, etc'
        WHEN sr.area_of_law = 'BT' THEN 'Boundary/Title Disputes'
        WHEN sr.area_of_law = 'CC' THEN 'Codicils'
        WHEN sr.area_of_law = 'CD' THEN 'Credit Reports and Repair'
        WHEN sr.area_of_law = 'CF' THEN 'Consumer/Finance'
        WHEN sr.area_of_law = 'CL' THEN 'Civil Litigation'
        WHEN sr.area_of_law = 'CN' THEN 'Construction'
        WHEN sr.area_of_law = 'CO' THEN 'Collection'
        WHEN sr.area_of_law = 'CP' THEN 'Corporate'
        WHEN sr.area_of_law = 'CR' THEN 'Criminal'
        WHEN sr.area_of_law = 'CS' THEN 'Child Support Issues'
        WHEN sr.area_of_law = 'CT' THEN 'Contract'
        WHEN sr.area_of_law = 'CU' THEN 'Child Guardianship/Custody/Vis'
        WHEN sr.area_of_law = 'CY' THEN 'Copyright'
        WHEN sr.area_of_law = 'DE' THEN 'Deeds'
        WHEN sr.area_of_law = 'DI' THEN 'Divorce'
        WHEN sr.area_of_law = 'DU' THEN 'Divorce Uncontested'
        WHEN sr.area_of_law = 'DV' THEN 'Domestic Violence'
        WHEN sr.area_of_law = 'ED' THEN 'Education'
        WHEN sr.area_of_law = 'EL' THEN 'Elder Law'
        WHEN sr.area_of_law = 'EM' THEN 'Employment'
        WHEN sr.area_of_law = 'EP' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'ET' THEN 'Entertainment'
        WHEN sr.area_of_law = 'FA' THEN 'Firearm'
        WHEN sr.area_of_law = 'FC' THEN 'Foreclosures'
        WHEN sr.area_of_law = 'FL' THEN 'Family Law'
        WHEN sr.area_of_law = 'FR' THEN 'Franchise Law'
        WHEN sr.area_of_law = 'FW' THEN 'Federal Workers Comp'
        WHEN sr.area_of_law = 'GA' THEN 'Garnishment'
        WHEN sr.area_of_law = 'GC' THEN 'Guardianship/Conservatorship'
        WHEN sr.area_of_law = 'GL' THEN 'General Law'
        WHEN sr.area_of_law = 'HL' THEN 'Home Equity Loan'
        WHEN sr.area_of_law = 'ID' THEN 'Incompetency Defense'
        WHEN sr.area_of_law = 'IM' THEN 'Immigration'
        WHEN sr.area_of_law = 'IN' THEN 'Insurance'
        WHEN sr.area_of_law = 'IT' THEN 'Identity Theft'
        WHEN sr.area_of_law = 'JV' THEN 'Juvenile'
        WHEN sr.area_of_law = 'LL' THEN 'Labor Law'
        WHEN sr.area_of_law = 'LM' THEN 'Legal Malpractice'
        WHEN sr.area_of_law = 'LN' THEN 'Loan Modification'
        WHEN sr.area_of_law = 'LT' THEN 'Landlord Tenant'
        WHEN sr.area_of_law = 'MD' THEN 'Mortgage Document Services'
        WHEN sr.area_of_law = 'ML' THEN 'Military Law/Security Clearance'
        WHEN sr.area_of_law = 'MM' THEN 'Medical Malpractice'
        WHEN sr.area_of_law = 'MR' THEN 'Mineral Rights'
        WHEN sr.area_of_law = 'NC' THEN 'Name Change'
        WHEN sr.area_of_law = 'OG' THEN 'Oil and Gas'
        WHEN sr.area_of_law = 'PA' THEN 'Power of Attorney'
        WHEN sr.area_of_law = 'PC' THEN 'Patent Copyright'
        WHEN sr.area_of_law = 'PD' THEN 'Pay Day Loans/Title Loans'
        WHEN sr.area_of_law = 'PI' THEN 'Personal Injury'
        WHEN sr.area_of_law = 'PL' THEN 'Product Liability'
        WHEN sr.area_of_law = 'PN' THEN 'Paternity'
        WHEN sr.area_of_law = 'PR' THEN 'Probate'
        WHEN sr.area_of_law = 'PS' THEN 'Public Service'
        WHEN sr.area_of_law = 'PT' THEN 'Patents'
        WHEN sr.area_of_law = 'PU' THEN 'Prenuptial Agreements'
        WHEN sr.area_of_law = 'PY' THEN 'Promissory Notes'
        WHEN sr.area_of_law = 'RC' THEN 'Real Estate Closing'
        WHEN sr.area_of_law = 'RE' THEN 'Real Estate'
        WHEN sr.area_of_law = 'RF' THEN 'Refinancing of Home'
        WHEN sr.area_of_law = 'RP' THEN 'Repossession'
        WHEN sr.area_of_law = 'SC' THEN 'Small Claims'
        WHEN sr.area_of_law = 'SL' THEN 'Suspended Driver\'s License'
        WHEN sr.area_of_law = 'SN' THEN 'Special Needs Trust'
        WHEN sr.area_of_law = 'SS' THEN 'Social Security'
        WHEN sr.area_of_law = 'TA' THEN 'Property Tax Assessments'
        WHEN sr.area_of_law = 'TM' THEN 'Trademarks'
        WHEN sr.area_of_law = 'TR' THEN 'Traffic'
        WHEN sr.area_of_law = 'TS' THEN 'Timeshares'
        WHEN sr.area_of_law = 'TU' THEN 'Trust'
        WHEN sr.area_of_law = 'TX' THEN 'Tax'
        WHEN sr.area_of_law = 'UA' THEN 'Uncontested Adoption'
        WHEN sr.area_of_law = 'VA' THEN 'Veteran\'s Affairs'
        WHEN sr.area_of_law = 'VD' THEN 'Motor Vehicle Property Damage'
        WHEN sr.area_of_law = 'VE' THEN 'Vehicle Financing Issues'
        WHEN sr.area_of_law = 'WC' THEN 'Worker\'s Compensation'
        WHEN sr.area_of_law = 'WD' THEN 'Wrongful Death'
        WHEN sr.area_of_law = 'WL' THEN 'Will'
        WHEN sr.area_of_law = 'ZP' THEN 'Zoning Permits'
    END AS AOL,
    CASE
        WHEN sr.area_of_law = 'AA' THEN 'Traffic'
        WHEN sr.area_of_law = 'AD' THEN 'Family Law'
        WHEN sr.area_of_law = 'AF' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'AM' THEN 'Employment'
        WHEN sr.area_of_law = 'BD' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'BK' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'BR' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'BS' THEN 'Bussines'
        WHEN sr.area_of_law = 'BT' THEN 'Real Estate'
        WHEN sr.area_of_law = 'CC' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'CD' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'CF' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'CL' THEN 'Civil Litigation'
        WHEN sr.area_of_law = 'CN' THEN 'Real Estate'
        WHEN sr.area_of_law = 'CO' THEN 'Collection'
        WHEN sr.area_of_law = 'CP' THEN 'Bussines'
        WHEN sr.area_of_law = 'CR' THEN 'Criminal'
        WHEN sr.area_of_law = 'CS' THEN 'Family Law'
        WHEN sr.area_of_law = 'CT' THEN 'Contracts'
        WHEN sr.area_of_law = 'CU' THEN 'Family Law'
        WHEN sr.area_of_law = 'CY' THEN 'Bussines'
        WHEN sr.area_of_law = 'DE' THEN 'Real Estate'
        WHEN sr.area_of_law = 'DI' THEN 'Family Law'
        WHEN sr.area_of_law = 'DU' THEN 'Family Law'
        WHEN sr.area_of_law = 'DV' THEN 'Criminal'
        WHEN sr.area_of_law = 'ED' THEN 'Other Law'
        WHEN sr.area_of_law = 'EL' THEN 'Family Law'
        WHEN sr.area_of_law = 'EM' THEN 'Employment'
        WHEN sr.area_of_law = 'EP' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'ET' THEN 'Bussines'
        WHEN sr.area_of_law = 'FA' THEN 'Criminal'
        WHEN sr.area_of_law = 'FC' THEN 'Real Estate'
        WHEN sr.area_of_law = 'FL' THEN 'Family Law'
        WHEN sr.area_of_law = 'FR' THEN 'Bussines'
        WHEN sr.area_of_law = 'FW' THEN 'Employment'
        WHEN sr.area_of_law = 'GA' THEN 'Employment'
        WHEN sr.area_of_law = 'GC' THEN 'Family Law'
        WHEN sr.area_of_law = 'GL' THEN 'Other Law'
        WHEN sr.area_of_law = 'HL' THEN 'Real Estate'
        WHEN sr.area_of_law = 'ID' THEN 'Family Law'
        WHEN sr.area_of_law = 'IM' THEN 'Immigration'
        WHEN sr.area_of_law = 'IN' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'IT' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'JV' THEN 'Family Law'
        WHEN sr.area_of_law = 'LL' THEN 'Employment'
        WHEN sr.area_of_law = 'LM' THEN 'Other Law'
        WHEN sr.area_of_law = 'LN' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'LT' THEN 'Landlord Tenant'
        WHEN sr.area_of_law = 'MD' THEN 'Real Estate'
        WHEN sr.area_of_law = 'ML' THEN 'Employment'
        WHEN sr.area_of_law = 'MM' THEN 'Personal Injury'
        WHEN sr.area_of_law = 'MR' THEN 'Real Estate'
        WHEN sr.area_of_law = 'NC' THEN 'Family Law'
        WHEN sr.area_of_law = 'OG' THEN 'Real Estate'
        WHEN sr.area_of_law = 'PA' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'PC' THEN 'Bussines'
        WHEN sr.area_of_law = 'PD' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'PI' THEN 'Personal Injury'
        WHEN sr.area_of_law = 'PL' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'PN' THEN 'Family Law'
        WHEN sr.area_of_law = 'PR' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'PS' THEN 'Employment'
        WHEN sr.area_of_law = 'PT' THEN 'Bussines'
        WHEN sr.area_of_law = 'PU' THEN 'Bussines'
        WHEN sr.area_of_law = 'PY' THEN 'Contracts'
        WHEN sr.area_of_law = 'RC' THEN 'Real Estate'
        WHEN sr.area_of_law = 'RE' THEN 'Real Estate'
        WHEN sr.area_of_law = 'RF' THEN 'Real Estate'
        WHEN sr.area_of_law = 'RP' THEN 'Consumer Rights'
        WHEN sr.area_of_law = 'SC' THEN 'Civil Litigation'
        WHEN sr.area_of_law = 'SL' THEN 'Traffic'
        WHEN sr.area_of_law = 'SN' THEN 'Civil Litigation'
        WHEN sr.area_of_law = 'SS' THEN 'Employment'
        WHEN sr.area_of_law = 'TA' THEN 'Real Estate'
        WHEN sr.area_of_law = 'TM' THEN 'Bussines'
        WHEN sr.area_of_law = 'TR' THEN 'Traffic'
        WHEN sr.area_of_law = 'TS' THEN 'Real Estate'
        WHEN sr.area_of_law = 'TU' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'TX' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'UA' THEN 'Family Law'
        WHEN sr.area_of_law = 'VA' THEN 'Employment'
        WHEN sr.area_of_law = 'VD' THEN 'Traffic'
        WHEN sr.area_of_law = 'VE' THEN 'Employment'
        WHEN sr.area_of_law = 'WC' THEN 'Employment'
        WHEN sr.area_of_law = 'WD' THEN 'Employment'
        WHEN sr.area_of_law = 'WL' THEN 'Estate Planning'
        WHEN sr.area_of_law = 'ZP' THEN 'Real Estate'
    END AS parent_AOL,    
    ROW_NUMBER() OVER (
      PARTITION BY parent_AOL
      ORDER BY
        a.created_at DESC
    ) AS row_num
  FROM
      answers AS a
      LEFT JOIN service_requests AS sr ON a.id = sr.answers_id
  WHERE
    NOT a.questionnaire_name IS NULL
    AND a.row_deleted = FALSE
    AND NOT a.questionnaire_name ILIKE 'close_intakes%'
    AND NOT a.questionnaire_name ILIKE 'feedback%'
    AND NOT a.questionnaire_name ILIKE 'cancel-subscription%'
    AND NOT a.questionnaire_name ILIKE '%-es'
    AND NOT a.questionnaire_name ILIKE '%-fr'
    AND LENGTH(issue) > 12
    AND NOT IS_NULL_VALUE(issue)
    AND sr.area_of_law IS NOT NULL
    AND TRIM(sr.area_of_law) != ''
)
SELECT
  id_of_answer,
  created_at,
  AOL AS area_of_law,
  questionnaire_name,  
  issue,
  parent_AOL as parent_area_of_law,
FROM
  ranked_answers
WHERE
  row_num <= 10  
ORDER BY
  parent_AOL,
  row_num;  
```