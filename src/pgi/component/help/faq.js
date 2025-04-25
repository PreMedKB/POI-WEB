import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'pgi/style/p-faq.less';

class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
        }
    }

    handleAnchorClick = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <div className="faq-container">
                <div className="faq-left">
                    <div className="faq-left-title">Help</div>
                    <div className="faq-left-subtitle">
                        <a id="intr">General Information</a>
                    </div>
                    <div className="faq-left-content">
                        <a id="intr1">1. What is PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            PreMedKB-POI (Personal Omics Interpreter based on Precision Medicine Knowledgebase) is an efficient and user-friendly tool that assists clinicians and researchers in resolving patients' multi-omics therapeutic biomarkers to obtain treatments supported by clinical evidence or potentially feasible.
                        </p>
                        <p className="faq-left-content-text">
                            An important aspect of precision oncology aims to provide the right therapy based on interpreting unique omics features of each patient, thereby maximizing drug efficacy and minimizing adverse drug reactions. Thus, it is crucial to make full use of the patient's omics profiles and to interpret them accurately. Unfortunately, discrepancies in prominent precision oncology knowledge bases, limitations of manual interpretation, and the incomprehensiveness of using only somatic variant data all hinder accurate therapy selection.
                        </p>
                        <p className="faq-left-content-text">
                            To address this issue, we updated the knowledge of PreMedKB (Yu Y., et al. NAR Database Issue 2019) and developed a personal omics interpreter (POI) based on the upgraded database. The PreMedKB v2 used by the system seamlessly integrates the five essential components of precision oncology therapy in actual clinical care: disease, genes, variants, drugs, and clinical evidence. The POI system, which runs based on harmonized knowledge, then enables the joint resolution of patient genomic and transcriptomic profiles, resulting in more comprehensive and accurate drug recommendations and drug response interpretations.
                        </p>
                        <a id="intr2">2. Why users shall choose PreMedKB-POI for drug recommendations?</a>
                        <p className="faq-left-content-text">
                            The PreMedKB-POI achieves more comprehensive drug recommendations using a harmonized knowledge network and a multi-dimensional interpretation strategy. First, POI utilizes the knowledge from 21 published databases with 41,360 therapeutic records in the form of “gene-variant-disease-drug”, along with cutting-edge ontology and semantic network techniques. Secondly, POI prioritizes targeted and immunological drugs by jointly deciphering the somatic variants (SNV/Indel, CNV, fusions, TMB, and MSI), pathogenic germline variants, and aberrantly expressed genes of a patient. Thirdly, for patients without straightforward clinically actionable biomarkers, POI infers repurposing regimens based on the association of drug targets with aberrant alterations in specific biological pathways. Additionally, POI provides phenotype-based chemotherapy prescriptions by assigning diplotypes for pharmacogenomics genes.
                        </p>

                        <a id="intr3">3. What types of omics data can be used for drug recommendations in PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            PreMedKB-POI enables the joint resolution of patient genomic and transcriptomic profiles, including somatic variations, germline variations, copy number alterations, level of tumor mutation burden, expression profiles, and so on. Note, the current version of PreMedKB-POI can analyze variations in VCF/TXT/CSV format. High-throughput data in FASTQ format is not available.
                        </p>
                        <a id="intr4">4. Why does PreMedKB-POI use not only genomic information but also transcriptomic profiles for drug recommendation?</a>
                        <p className="faq-left-content-text">
                            As omics technologies and methodologies develop, precision medicine, especially precision oncology, unprecedently requires identifying and interpreting molecular alterations from multi-omic perspectives. The mainstream focuses on giving precision therapies based on genomic variations, which lack interpretation of transcriptional levels to provide more information on clinical suggestions.
                        </p>
                        <p className="faq-left-content-text">
                            Therefore, PreMedKB-POI achieves interpreting transcriptomic expression profiles, enables the joint resolution of patient genomic and transcriptomic profiles, and thus gives comprehensive and accurate drug recommendations and drug response interpretations.
                        </p>
                        <a id="intr5">5. What is the relationship between PreMedKB-POI and previous PreMedKB?</a>
                        <p className="faq-left-content-text">
                            We released PreMedKB (Yu Y., et al., Nucleic Acids Research, 2019), an integrated precision medicine knowledgebase for interpreting relationships between diseases, genes, variants, and drugs 3 years ago, as known as PreMedKB v1. PreMedKB-POI is built based on PreMedKB architecture. However, there are some differences between PreMedKB-POI and PreMedKB v1.
                        </p>
                        <p className="faq-left-content-text">
                            First, PreMeKB-POI is a web server that can analyze patients' multi-omics data at a time, including somatic variations, germline variations, and expression profiling. While PreMedKB v1 is a web-based database that can view relationships between a/some given variation(s) to genes, drugs, and diseases.
                        </p>
                        <p className="faq-left-content-text">
                            Secondly, the results of PreMedKB-POI and PreMedKB v1 are different. PreMedKB-POI provides a ranked list of drugs based on levels of clinical evidence, while PreMedKB v1 provides a knowledge graph of relationships among elements based on confidence ratings calculated mostly based on the number of occurrences in databases, clinical trials, and publications.
                        </p>
                        <p className="faq-left-content-text">
                            Thirdly, we updated the source databases of PreMedKB, add several cancer-specific knowledgebases for satisfying precision oncology, and remove some knowledgebases that were less relevant to oncology to gain a higher computing efficiency.
                        </p>
                        <a id="intr6">6. How does PreMedKB-POI provide drug recommendations? </a>
                        <p className="faq-left-content-text">
                            The PreMedKB-POI system consists of two main components as the name implies. One of them is the PreMedKB database which provides harmonized therapeutic knowledge, and the POI which is a tool for analyzing the entire process from receiving the user data to outputting the results. The steps are shown in the following diagram.
                        </p>
                        <p className="faq-left-content-text">
                            POI pre-processes and normalizes the format of multi-omics data to PreMedKB to retrieve the drugs associated with the specific disease and variants. The POI runs a built-in parsing tool to obtain drug repurposing data if the user cannot benefit from prior knowledge with evidence level. Besides, drug response can be obtained if germline data is available.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={600} src={require('../../../common/image/image.png')} />
                        </p>
                        <a id="intr7">7. How are evidence levels defined in PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            <b>PreMedKB-POI Evidence Levels</b>  are divided into five categories, with Levels A-D defined by reference to the structured guidelines for clinical interpretation of somatic variants, published by the Association for Molecular Pathology, the American Society of Clinical Oncology, and the College of American Pathologists (AMP/ASCO/CAP). Level E is the inferential results obtained by computational extrapolation for PreMedKB-POI.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={450} src={require('../../../common/image/image2.png')} />
                        </p>
                        <p className="faq-left-content-text">
                            These guidelines are compatible with the existing evidence levels of this knowledgebases. We have mapped the definitions of the levels of evidence within each knowledge base to the AMP/ASCO/CAP definitions, which have been manually reviewed. In addition, Level E consists of the evidence that is not clearly defined in the CIViC knowledgebase which is integrated by PreMedKB, and the undirected evidence obtained by computational extrapolation for PreMedKB-POI. Evidence levels mapping to knowledgebase-specific evidence codes are described below.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/image3.png')} />
                        </p>
                        <p className="faq-left-content-text">

                        </p>
                        <a id="intr8">8. How does PreMedKB-POI work in pharmacogenomics and deciphering drug responses?</a>
                        <p className="faq-left-content-text">
                            Genomic mutations do affect the drug response and the wide interindividual variability in drug response due to different genetic backgrounds. In the area of pharmacogenomics (PGx), germline genetic variants functioning in the absorption, distribution, metabolism, and elimination (ADME) of drugs largely contribute to the inter-individual differences in pharmacokinetics or drug response phenotypes. Based on the genotype-phenotype association, the efficacy and toxicity of drugs can be revealed with a view to tailoring effective and safe drugs, as well as providing sensible advice on the dosage.
                        </p>
                        <p className="faq-left-content-text">
                            A pharmacogenetic allele (*allele) or haplotype is composed of one or more genetic variants on the same chromosome, and a diplotype is formed by a pair of haplotypes of the same gene on homologous chromosomes. In addition, genotype in this paper refers to variants detected by sequencing platform that will be identified as alleles (haplotypes) and then assigned as diplotypes. The diplotypes bridge the transition from genotype to phenotype and are the basis for precise drug administration. For instance, patients with a homozygous UGT1A1*28 (*28/*28 diplotype) are poor metabolizers, which leads to irreversible toxic effects when taking Belinostat, and require starting with a lower dose.
                        </p>
                        <p className="faq-left-content-text">
                            PreMedKB-POI invokes an automated Pharmacogenomics Annotation tool (PAnno) to report prescribing recommendations and phenotypes by parsing the germline variant call format (VCF) file from NGS and the population to which the individual belongs. PAnno consists of two components, diplotype inference and clinical annotation. The fisrt part aims to identify PGx alleles on each chromosome and infer the diplotypes from the user-submitted VCF file. The second part aims to translate inferred diplotypes into phenotypes to provide prescription recommendations and predict drug responses based on the clinical annotations from the Clinical Pharmacogenetics Implementation Consortium (CPIC), the Pharmacogenomics Knowledgebase (PharmGKB), the Dutch Pharmacogenetics Working Group (DPWG), the Canadian Pharmacogenomics Network for Drug Safety (CPNDS), and the French National Network for Pharmacogenetics (RNPGx).
                        </p>
                        <p className='faq-left-content-img'>
                            <img style={{ maxWidth: '350px' }} src={require('../../../common/image/G8.png')} />
                        </p>
                        <a id="intr9">9. How does PreMedKB-POI contribute to transcriptomic therapeutics?</a>
                        <p className="faq-left-content-text">
                            PreMedKB-POI utilizes transcriptomic data as a complement to personal omics interpretation. The input count files from the <a href="https://docs.gdc.cancer.gov/Data/Bioinformatics_Pipelines/Expression_mRNA_Pipeline/">mRNA Analysis Pipeline</a> are required from both tumor tissue and normal tissue of one case (which are <b>Tumor-Normal Paired</b>), and will be preprocessed by the following steps: 1) matching to gene symbols, 2) removing duplicated genes, 3)filter by log2 transformed fold change (log2FC) at CPM level. Finally, genes with log2FC values out of the threshold will be labeled as over- or under-expression. The case with targeted over- or under-expressed genes will obtain therapeutic advice according to the knowledge in PreMedKB v2 database.
                        </p>
                        <p className='faq-left-content-img'>
                            <img style={{ maxWidth: '350px' }} src={require('../../../common/image/G9.png')} />
                        </p>
                        <a id="intr10">10. How does indirect evidence (drug repurposing) be provided?</a>
                        <p className="faq-left-content-text">
                            The MSK-IMPACT study (Nat Med. 2017) showed that in the search for tumour-targeting drugs based on somatic cell variants, approximately 60% of patients had difficulty finding drugs with clinical evidence from a single database, e.g., OncoKB. Therefore, we fused transcriptomic information based on genomic variants in the hope of providing dosing advice to patients.
                        </p>
                        <p className="faq-left-content-text">
                            However, the expression-related therapeutic biomarker covers a limited number of target genes and cancer types, users do not always have expression profiles, and the transcriptome is not quantified with sufficient precision. We also look at the genomic level to first determine potentially abnormal variants (genes) and then combine this with Hallmark gene pathway information to determine whether these abnormal genes are enriched in the same pathway as the drug targets in PreMedKB. If they are in the same pathway with high correlation (PPI Score from STRING database beyond 0.9), then we consider that the drug corresponding to that target is likely to be effective.
                        </p>
                        <p className='faq-left-content-img'>
                            <img style={{ maxWidth: '400px' }} src={require('../../../common/image/G10.png')} />
                        </p>
                    </div>
                    <div className="faq-left-subtitle">
                        <a id="usab">Usability</a>
                    </div>
                    <div className="faq-left-content">
                        <a id="usab1">1. Are all data in PreMedKB-POI accessible to the community?</a>
                        <p className="faq-left-content-text">
                            Our data and algorithms used for analysis are deposited at <a>https://github.com/</a>, to the point of advancing the entire community.
                        In addition, data uploaded by users are automatically deleted every seven days and will not be shared according to the privacy policy.</p>
                        <a id="usab2">2. How to submit your own task in PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            You can submit your own task with personalized settings by either click "<b>Get Started</b>" on the Home page or directly going to the <b>Query</b> page.
                        Then fill in all parameters, and the requirements for each are described in detail behind the followed <b>question mark</b>.</p>
                        <a id="usab3">3. Why is it necessary to specify a disease type and a reference population?</a>
                        <p className="faq-left-content-text">
                            Precision therapy may be disturbed by the ambiguity of the diagnosis as well as great differences in the genetic background. When the disease type and the belonged population of the case are specified, a therapeutic report <b>with precision and proper</b> will be provided.</p>

                        <a id="usab4">4. Is TMB-H and MSI required to specify?</a>
                        <p className="faq-left-content-text">
                            In the current version, we need users to determine the status of the TMB and MSI themselves in advance.
                        </p>
                        <a id="usab5">5. How to check the task status?</a>
                        <p className="faq-left-content-text">
                            After your task is submitted, the interface will turn to show you the status of your tasks running in real-time, including "<b>waiting</b>", "<b>running</b>", "<b>success</b>", "<b>failed</b>", etc.
                        Your therapeutic report will be displayed only when the task status has changed to "<b>success</b>".</p>
                        <a id="usab6">6. Where can I find the final therapeutic report?</a>
                        <p className="faq-left-content-text">
                            The final therapeutic report can be viewed on the <b>Report</b> page. We recommend that you save the URL of the interpretation report, for example as a bookmark, and then come back some time later to view the results. It is also possible to keep the browser open until the results appear.</p>
                        <a id="usab7">7. What information does the Example page and Statistics page deliver?</a>


                        <p className="faq-left-content-text">
                            The <b>Example</b> page <b>gives exemplary reports</b> generated by PreMedKB-POI from the input personal omics data, and it can help you quickly associate your own study with our work.
                        </p>
                        <p className="faq-left-content-text">
                            The <b>Statistics</b> page displays <b>general information of multi-sourced</b> data integrated with PreMedKB2.0 by dynamically visualizing the type, the amount, and the source of the data, thus depicting a comprehensive scene in molecular alterations and clinical decisions.
                        </p>
                        <a id="usab8">8. Are my analyses and results privately in PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            Yes, individual results could only be queried by the random ID generated when the task was submitted. If you have not shared the ID with others, only you can be accessible to view the results.
                        </p>
                        <a id="usab9">9. What happens if the provided data mismatches with the Meta database?</a>
                        <p className="faq-left-content-text">
                            There will be a <b>check</b> before you submit your own task, and the task will fail to be submitted if the data you provide does not match the format in the database. The report will not be provided for you until the format of the data you submit matches the system requirements.
                        </p>
                        <a id="usab10">10. How to achieve multi-sample analyses in PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            We will provide the <b>command-line tool</b> implementation in the next phase. In the short term, if you need analyses for bulk samples, please feel free to contact us.
                        </p>
                    </div>
                    <div className="faq-left-subtitle">
                        <a id="io">Input and output</a>
                    </div>
                    <div className="faq-left-content">
                        <a id="io1">1. What is the input of PreMedKB-POI?</a>
                        <p id="io11" className="faq-left-content-sub"><b>Basic Information</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1B.png')} />
                        </p>
                        <p className="faq-left-content-text">
                            <b>Title: required. </b>Title is used as a unique id and from which the report link is generated. Note: please do not use duplicated titles to submit tasks.
                        </p>
                        <p className="faq-left-content-text">
                            <b>Tumor Type: required. </b>Selecting a definite tumour type will help the PreMedKB-POI to invoke more accurate therapeutic knowledge. Besides, if you would like to use a tumor-only RNA expression profile to obtain drug recommendations, PreMedKB-POI will make inferences based on the profiles of the corresponding tissue and tumour type in the TCGA cohort.
                        </p>
                        <p className="faq-left-content-text">
                            <b>Reference Population: required. </b>PreMedKB-POI predicts gene diplotypes based on allele frequencies of germline mutations in a given reference population. Gene diplotypes will be further used for the analysis of drug response.
                        </p>
                        <p className="faq-left-content-text">
                            <b>Reference Genome: required. </b>Please select. It is the reference genome version used in the <a href="https://gdc.cancer.gov/content/variant-calling-gdc">variant calling process</a>.
                        </p>
                        <p id="io12" className="faq-left-content-sub"><b>Somatic Variation</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1S.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on somatic variations, please provide the following information. </p>
                        <p className="faq-left-content-text"><a href="https://www.cancer.gov/publications/dictionaries/genetics-dictionary/def/somatic-variant">Somatic Variation</a> and relative information should be filled in here. </p>
                        <p className="faq-left-content-text">
                            <b>Somatic VCF: required.</b>Somatic VCF is the <a href="https://docs.gdc.cancer.gov/Data/File_Formats/VCF_Format/">standard VCF file</a> containing somatic variation information.
                        </p>

                        <p id="io13" className="faq-left-content-sub"><b>Germine Variation</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1G.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on germline variations, please provide the following information.</p>
                        <p className="faq-left-content-text"><a href="https://www.cancer.gov/publications/dictionaries/genetics-dictionary/def/germline-variant">Germline Variation</a> and relative information should be filled in here. </p>
                        <p className="faq-left-content-text">
                            <b>Germline VCF: required.</b>Germline VCF is the <a href="https://docs.gdc.cancer.gov/Data/File_Formats/VCF_Format/">standard VCF file</a> containing germline mutation information
                        </p>

                        <p id="io14" className="faq-left-content-sub"><b>Copy Number Variation</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1C.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on copy numer varations, please provide the following information. </p>
                        <p className="faq-left-content-text"><a href="https://www.genome.gov/genetics-glossary/Copy-Number-Variation">Copy number variation (CNV)</a> is defined as a copy number change involving a DNA segment that is 1kb or larger.</p>
                        <p className="faq-left-content-text">
                            <b>CNV File: required. </b>The CNV file could be a tab-separated file (*.tsv) or a comma-separated file (*.csv), which includes the column of "gene symbol" and "estimation" at least for PreMedKB-POI (the estimation includes "gain",
                            "loss" and "neutral"). The CNV common process reference can be found at <a href="https://docs.gdc.cancer.gov/Data/Bioinformatics_Pipelines/CNV_Pipeline/">GDC CNV pipeline</a>.
                        </p>
                        <p id="io15" className="faq-left-content-sub"><b>Gene Fusion</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1GENE.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on gene fusions, please provide the following information. </p>
                        <p className="faq-left-content-text"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/fusion-gene">Gene fusion</a> means a gene made by joining parts of two different genes.</p>
                        <p className="faq-left-content-text">
                            <b>Gene Fusion File: required.</b>The gene fusion file is a tab-separated file (*.tsv) or a comma-separated file (*.csv).
                            The two columns named "fusion gene A" and "fusion gene B" are required. (the gene symbol should be annotated instead of gene id).
                        </p>
                        <p id="io16" className="faq-left-content-sub"><b>Tumor Mutational Burden</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1T.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on tumor mutation burden, please provide the following information. </p>
                        <p className="faq-left-content-text"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/tumor-mutational-burden">Tumor Mutational Burden</a> is the total number of mutations (changes) found in the DNA of cancer cells.</p>
                        <p className="faq-left-content-text">
                            <b>TMB-H: required.</b>The detail could be seen on the Help Page.
                        </p>
                        <p id="io17" className="faq-left-content-sub"><b>Microsatellite Instability</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1M.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on microsatellite instability, please provide the following information. </p>
                        <p className="faq-left-content-text"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/microsatellite-instability">Microsatellite Instability</a> is the change that occurs in certain cells (such as cancer cells) in which the number of repeated DNA bases in a microsatellite (a short,
                         repeated sequence of DNA) is different from what it was when the microsatellite was inherited.</p>
                        <p className="faq-left-content-text">
                            <b>MSI-H: required.</b> The detail could be seen on the Help Page.
                        </p>
                        <p id="io18" className="faq-left-content-sub"><b>Expression Profile</b></p>
                        <p className='faq-left-content-img'>
                            <img width={500} src={require('../../../common/image/I1E.png')} />
                        </p>
                        <p className="faq-left-content-text">If the user wishes PreMedKB-POI to do analysis based on expression profiles, please provide the following information.</p>
                        <p className="faq-left-content-text">Expression Profile is the gene count file obtained from the <a href="https://docs.gdc.cancer.gov/Data/Bioinformatics_Pipelines/Expression_mRNA_Pipeline/">mRNA Analysis Pipeline</a>.</p>
                        <p className="faq-left-content-text"><b>Tumor File: required.  Normal File: optional.</b></p>
                        <p className="faq-left-content-text">
                            Users can upload a gene count matrix, which is a tab-separated file (*.tsv) or a comma-separated file (*.csv). The first column should be gene IDs based on Ensembl annotation (ids those start with ENSG) or HGNC gene symbols. The second column should be the gene count of each gene. Note, only the first two columns are used in PreMedKB-POI.
                        </p>
                        <p className="faq-left-content-text">
                            If the normal file is provided, PreMedKB-POI will use log2 fold change of counts per million (CPM) of tumor and normal files for further analysis.
                        </p>
                        <p className="faq-left-content-text">
                            If the normal file is missing, PreMedKB-POI will automatically use the expression intervals in the TCGA cohort, using a given tumor type in "Basic information". This feature will be available in the next version.
                        </p>
                        <a id="io2">2. What are data formatting requirements?</a>
                        <p className="faq-left-content-text">PreMedKB-POI can analyze data in VCF, TXT and CSV format. Users can download example input files on the "example" page to confirm data formatting requirements.  </p>
                        <a id="io3">3. What is the output of PreMedKB-POI?</a>
                        <p className="faq-left-content-text">
                            When PreMedKB-POI is running, its results are provided via interactive reports. These web reports can be interactively browsed by the user. An overview of the report is shown below.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={450} src={require('../../../common/image/I31.png')} />
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={450} src={require('../../../common/image/I32.png')} />
                        </p>
                        <p id="io31" className="faq-left-content-sub"><b>Submission Infomation</b></p>
                        <p className="faq-left-content-text">The general information that users submit.</p>
                        <p id="io32" className="faq-left-content-sub"><b>Summary</b></p>
                        <p className="faq-left-content-text">
                            The summary section is oriented towards providing the most straightforward recommended therapies outcome. The drugs obtained based on the interpretation of personal omics data are ranked according to the level of evidence defined by the PreMedKB-POI. Drugs that were identified as having the potential to make patients resistant or have adverse reactions were specifically flagged. All drug recommendation results are listed in the two tables.
                        </p>
                        <p id="io33" className="faq-left-content-sub"><b>Detail</b></p>
                        <p className="faq-left-content-text">
                            The detail section consists of three main modules: <b>Direct Evidence</b>, <b>Indirect Evidence</b>, and <b>Drug Response</b>.
                        </p>
                        <p className="faq-left-content-text">
                            <b>1. Direct Evidence</b> contains targeted drugs according to distinct levels of clinical relevance, based on somatic variants，germline variants, and gene expression profiles. The integrative therapeutic knowledge was used.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={700} src={require('../../../common/image/I3D.png')} />
                        </p>
                        <p className="faq-left-content-text">
                            <b>2. Indirect Evidence</b> contains inferential drug recommendations according to indirect evidence. Building on the therapeutic regimens with clinical evidence integrated into PreMedKB, we combine biological context information, i.e., pathway networks and population mutation frequencies to provide drug repurposing regimens for the person who does not have any therapeutic biomarker.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={700} src={require('../../../common/image/I3D2.png')} />
                        </p>
                        <p className="faq-left-content-text">
                            <b>3. Drug Response</b> contains information about a patient’s
                            risk of medication side effects and drug efficacy with cancer medications based on genetic variations uploaded by users in the "germline variation" session.
                        </p>
                        <p className='faq-left-content-img'>
                            <img width={700} src={require('../../../common/image/I3D3.png')} />
                        </p>

                        <a id="io4">4. Can users download reports of PreMedKB-POI?</a>
                        <p className="faq-left-content-text">Yes. Users can download reports by clicking "Download Results(zip)" on the report page. </p>
                    </div>
                    <div className="faq-left-subtitle">
                        <a id="avai">Availability</a>
                    </div>
                    <div className="faq-left-content">

                        <a id="avai2">1. How to cite PreMedKB-POI?</a>
                        <p className="faq-left-content-text-last">
                            Yaqing Liu, et al. PreMedKB-POI. <Link to="/homepage">https://premedkb.cn/poi/.</Link>
                        </p>
                    </div>
                    <div className="faq-left-subtitle">
                        <a id="avai">Contact us</a>
                    </div>
                    <div className="faq-left-content">

                        <p className="faq-left-content-text-last">
                            <b>Center for Pharmacogenomics, Fudan University</b>
                        </p>
                        <p style={{ fontStyle: 'italic' }} className="faq-left-content-text-last">
                            2005, Songhu Road, Yangpu District, Shanghai, China
                        </p>
                        <p style={{ fontStyle: 'italic', color: '#0551A5' }} className="faq-left-content-text-last">
                            <b>premedkb_poi@groups.outlook.com</b>
                        </p>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="faq-right">
                    <div className="faq-right-div">
                        <div className="faq-right-content">
                            <div className="faq-right-content-title">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr')}>General Information</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr1')}>1. What is PreMedKB-POI?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr2')}>2. Why users shall choose PreMedKB-POI for drug recommendations? </a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr3')}>3. What types of omics data can be used for drug recommendations in </a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr4')}>4. Why does PreMedKB-POI use not only genomic information but also </a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr5')}>5. What is the relationship between PreMedKB-POI and previous PreMedKB? </a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr6')}>6. How does PreMedKB-POI provide drug recommendations?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr7')}>7. How are evidence levels defined in PreMedKB-POI?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr8')}>8. How does PreMedKB-POI work in pharmacogenomics and deciphering drug </a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr9')}>9. How does PreMedKB-POI contribute to transcriptomic therapeutics?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'intr10')}>10. How does indirect evidence (drug repurposing) be provided?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-title">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'usab')}>Usability</a>
                                </div>
                            </div>
                            <div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab1')}>1. Are all data in PreMedKB-POI accessible to the community?</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab2')}>2. How to submit your own task in PreMedKB-POI?</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab3')}>3. Why is it necessary to specify a disease type and a reference</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab4')}>4. Is TMB-H and MSI required to specify?</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab5')}>5. How to check the task status?</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab6')}>6. Where can I find the final therapeutic report?</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab7')}>7. What information does the Example page and Statistics page</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab8')}>8. Are my analyses and results privately in PreMedKB-POI?</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab9')}>9. What happens if the provided data mismatches with the Meta</a>
                                    </div>
                                </div>
                                <div className="faq-right-content-subtitle">
                                    <div className="faq-right-content-inner">
                                        <a onClick={this.scrollToAnchor.bind(this, 'usab10')}>10. How to achieve multi-sample analyses in PreMedKB-POI?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="faq-right-content-title">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io')}>Input and output</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io1')}>1. What is the input of PreMedKB-POI?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io11')}>Basic Information</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io12')}>Somatic Variation</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io13')}>Germine Variation</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io14')}>Copy Number Variation</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io15')}>Gene Fusion</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io16')}>Tumor Mutational Burden</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io17')}>Microsatellite Instability</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io18')}>Expression Profile</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io2')}>2. What are data formatting requirements?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io3')}>3. What is the output of PreMedKB-POI?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io31')}>Submission Information</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io32')}>Summary</a>
                                </div>
                            </div><div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner-in">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io33')}>Detail</a>
                                </div>
                            </div>
                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'io4')}>4. Can users download reports of PreMedKB-POI?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-title">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'avai')}>Availability</a>
                                </div>
                            </div>

                            <div className="faq-right-content-subtitle">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'avai2')}>1. How to cite PreMedKB-POI?</a>
                                </div>
                            </div>
                            <div className="faq-right-content-title">
                                <div className="faq-right-content-inner">
                                    <a onClick={this.scrollToAnchor.bind(this, 'avai')}>Contact us</a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Faq;