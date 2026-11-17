import os
import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

base_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\baaand-phase3"
docs_dir = os.path.join(base_dir, "docs")

doc_files = [
    ("00-assumptions.md", "Section 0: Project Scope & Autonomous Assumptions"),
    ("01-design-system.md", "Section 1: Design Direction & Token Design System"),
    ("04-ui-states.md", "Section 2: Comprehensive UI States Catalog"),
    ("05-usability-testing.md", "Section 3: Usability Testing Protocol & AI Cognitive Walkthrough"),
    ("06-heuristic-ux-ui-audit.md", "Section 4: Expert Heuristic Evaluation & UX/UI Audit of Prototype v1"),
    ("07-iteration-log.md", "Section 5: Iteration Remediation Log (H1–H10 Fixes)"),
    ("07-before-after.md", "Section 6: Prototype Before & After Visual Analysis"),
    ("09-rationale-traceability.md", "Section 7: Design Rationale & Complete Traceability Matrix"),
    ("10-future-scope-reflection.md", "Section 8: Future Scope Roadmap (2027) & Honest Reflection"),
    ("contributions.md", "Section 9: Team Contributions Matrix"),
]

# 1. Build DOCX
print("Building Phase3_Report.docx...")
doc = Document()

# Page Setup
sections = doc.sections
for s in sections:
    s.top_margin = Inches(1)
    s.bottom_margin = Inches(1)
    s.left_margin = Inches(1)
    s.right_margin = Inches(1)

# Title Page
title_p = doc.add_paragraph()
title_p.paragraph_format.space_before = Pt(36)
title_p.paragraph_format.space_after = Pt(12)
run_title = title_p.add_run("Team BAAAND: Campus Navigation System")
run_title.font.size = Pt(26)
run_title.font.bold = True
run_title.font.color.rgb = RGBColor(27, 54, 93) # #1B365D

sub_p = doc.add_paragraph()
sub_p.paragraph_format.space_after = Pt(24)
run_sub = sub_p.add_run("Phase 3 Comprehensive Report — Design, Test & Iterate")
run_sub.font.size = Pt(16)
run_sub.font.bold = True
run_sub.font.color.rgb = RGBColor(2, 128, 144) # #028090

meta_p = doc.add_paragraph()
meta_p.paragraph_format.space_after = Pt(36)
meta_p.add_run("Product: Campus Finder (Mobile-First Campus Navigation Aligned with Physical Signage)\n").font.size = Pt(11)
meta_p.add_run("Team Members: Chinnala Bhargavi, Nishi Patwari, Anushka Shailani, Aman, Ankit Kumar, Deepansh Maurya\n").font.size = Pt(11)
meta_p.add_run("Lead: Senior Product Designer & Front-End Engineer\n").font.size = Pt(11)
meta_p.add_run("Date: November 2026\n").font.size = Pt(11)

doc.add_page_break()

# Process each document
for filename, section_title in doc_files:
    filepath = os.path.join(docs_dir, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Section Heading
    h1 = doc.add_heading(section_title, level=1)
    h1.paragraph_format.space_before = Pt(18)
    h1.paragraph_format.space_after = Pt(10)
    for run in h1.runs:
        run.font.color.rgb = RGBColor(27, 54, 93)

    lines = content.split("\n")
    in_table = False
    table_lines = []

    for line in lines:
        stripped = line.strip()
        if not stripped:
            if in_table:
                # Flush table
                in_table = False
                # Simple table parser
                rows = [r.strip("|").split("|") for r in table_lines if not re.match(r"^\|?[\s\-:]+\|?$", r)]
                if len(rows) > 1:
                    t = doc.add_table(rows=len(rows), cols=len(rows[0]))
                    t.alignment = WD_TABLE_ALIGNMENT.CENTER
                    for r_idx, row in enumerate(rows):
                        for c_idx, cell in enumerate(row):
                            if c_idx < len(t.columns):
                                cell_p = t.cell(r_idx, c_idx).paragraphs[0]
                                cell_p.text = cell.strip()
                                if r_idx == 0:
                                    for r_run in cell_p.runs:
                                        r_run.font.bold = True
                table_lines = []
            continue

        if stripped.startswith("|") and stripped.endswith("|"):
            in_table = True
            table_lines.append(stripped)
            continue
        elif in_table:
            in_table = False
            table_lines = []

        if stripped.startswith("### "):
            h3 = doc.add_heading(stripped[4:], level=3)
            h3.paragraph_format.space_before = Pt(12)
            h3.paragraph_format.space_after = Pt(4)
        elif stripped.startswith("## "):
            h2 = doc.add_heading(stripped[3:], level=2)
            h2.paragraph_format.space_before = Pt(14)
            h2.paragraph_format.space_after = Pt(6)
            for r in h2.runs:
                r.font.color.rgb = RGBColor(2, 128, 144)
        elif stripped.startswith("# "):
            continue # Already handled by section title
        elif stripped.startswith("- ") or stripped.startswith("* "):
            p = doc.add_paragraph(stripped[2:], style='List Bullet')
            p.paragraph_format.space_after = Pt(3)
        elif re.match(r"^\d+\.\s+", stripped):
            item_text = re.sub(r"^\d+\.\s+", "", stripped)
            p = doc.add_paragraph(item_text, style='List Number')
            p.paragraph_format.space_after = Pt(3)
        elif stripped.startswith("> "):
            p = doc.add_paragraph(stripped[2:])
            p.paragraph_format.left_indent = Inches(0.5)
            p.paragraph_format.space_after = Pt(6)
            for r in p.runs:
                r.font.italic = True
                r.font.color.rgb = RGBColor(100, 116, 139)
        else:
            # Normal paragraph
            clean_text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", stripped) # clean markdown links
            clean_text = clean_text.replace("**", "").replace("*", "").replace("`", "")
            p = doc.add_paragraph(clean_text)
            p.paragraph_format.space_after = Pt(6)

docx_path = os.path.join(base_dir, "Phase3_Report.docx")
doc.save(docx_path)
print(f"Saved: {docx_path}")

# 2. Build Publication-Grade HTML Report
print("Building Phase3_Report.html...")
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Team BAAAND — Phase 3 Comprehensive Report</title>
  <link rel="stylesheet" href="prototype-final/tokens.css">
  <style>
    body {{
      font-family: var(--font-family-base, 'Inter', system-ui, sans-serif);
      color: #0F172A;
      background-color: #F8FAFC;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }}
    .report-container {{
      max-width: 900px;
      margin: 40px auto;
      background: #FFFFFF;
      padding: 60px 80px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }}
    h1.report-title {{
      font-size: 32px;
      font-weight: 800;
      color: #1B365D;
      margin-bottom: 6px;
      line-height: 1.2;
    }}
    h2.report-subtitle {{
      font-size: 18px;
      font-weight: 600;
      color: #028090;
      margin-bottom: 24px;
    }}
    .report-meta {{
      background: #F1F5F9;
      padding: 16px 20px;
      border-radius: 8px;
      font-size: 14px;
      color: #334155;
      margin-bottom: 40px;
      border-left: 4px solid #1B365D;
    }}
    h2.sec-heading {{
      font-size: 22px;
      font-weight: 700;
      color: #1B365D;
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 8px;
      margin-top: 40px;
      margin-bottom: 16px;
    }}
    h3.sub-heading {{
      font-size: 17px;
      font-weight: 600;
      color: #028090;
      margin-top: 24px;
      margin-bottom: 8px;
    }}
    p {{
      margin-bottom: 12px;
      font-size: 15px;
      color: #334155;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 13px;
    }}
    th, td {{
      padding: 10px 14px;
      border: 1px solid #E2E8F0;
      text-align: left;
    }}
    th {{
      background-color: #F8FAFC;
      font-weight: 700;
      color: #1B365D;
    }}
    blockquote {{
      border-left: 4px solid #028090;
      padding-left: 16px;
      margin: 16px 0;
      color: #475569;
      font-style: italic;
    }}
    code {{
      background: #F1F5F9;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 13px;
      color: #0F172A;
    }}
    ul, ol {{
      margin-left: 24px;
      margin-bottom: 16px;
      font-size: 15px;
      color: #334155;
    }}
    li {{
      margin-bottom: 6px;
    }}
    .badge-pill {{
      display: inline-block;
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: bold;
    }}
    .badge-must {{ background: #DCFCE7; color: #15803D; }}
    .badge-should {{ background: #E0F2FE; color: #0284C7; }}
    .badge-could {{ background: #FEF3C7; color: #D97706; }}
    @media print {{
      body {{ background: #FFFFFF; }}
      .report-container {{ box-shadow: none; padding: 0; margin: 0; max-width: 100%; }}
      .page-break {{ page-break-before: always; }}
    }}
  </style>
</head>
<body>
  <div class="report-container">
    <h1 class="report-title">Campus Finder: Team BAAAND</h1>
    <h2 class="report-subtitle">Phase 3 Final Engineering & Design Report — Design, Test & Iterate</h2>
    
    <div class="report-meta">
      <strong>Product:</strong> Mobile-First Campus Navigation System Aligned with Physical Signage<br>
      <strong>Team Members:</strong> Chinnala Bhargavi, Nishi Patwari, Anushka Shailani, Aman, Ankit Kumar, Deepansh Maurya<br>
      <strong>Lead:</strong> Senior Product Designer & Front-End Engineer<br>
      <strong>Figma Master Link:</strong> <a href="https://www.figma.com/design/UVo294wG285kYbtI9eBYaE">https://www.figma.com/design/UVo294wG285kYbtI9eBYaE</a> (Key: UVo294wG285kYbtI9eBYaE)<br>
      <strong>Final Prototype (v2):</strong> <a href="prototype-final/index.html">prototype-final/index.html</a>
    </div>
"""

# Append converted documents into HTML
for filename, section_title in doc_files:
    filepath = os.path.join(docs_dir, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        md_text = f.read()

    html_content += f'<div class="page-break"></div><h2 class="sec-heading">{section_title}</h2>\n'
    
    # Simple regex-based markdown to HTML block parser
    lines = md_text.split("\n")
    in_table = False
    table_lines = []
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if in_table:
                in_table = False
                rows = [r.strip("|").split("|") for r in table_lines if not re.match(r"^\|?[\s\-:]+\|?$", r)]
                if len(rows) > 0:
                    html_content += "<table><thead><tr>"
                    for h in rows[0]:
                        html_content += f"<th>{h.strip()}</th>"
                    html_content += "</tr></thead><tbody>"
                    for r in rows[1:]:
                        html_content += "<tr>"
                        for c in r:
                            cell_text = c.strip()
                            cell_text = re.sub(r"\*\*([^\*]+)\*\*", r"<strong>\1</strong>", cell_text)
                            cell_text = re.sub(r"`([^`]+)`", r"<code>\1</code>", cell_text)
                            html_content += f"<td>{cell_text}</td>"
                        html_content += "</tr>"
                    html_content += "</tbody></table>\n"
                table_lines = []
            continue

        if stripped.startswith("|") and stripped.endswith("|"):
            in_table = True
            table_lines.append(stripped)
            continue
        elif in_table:
            in_table = False
            table_lines = []

        if stripped.startswith("### "):
            html_content += f'<h3 class="sub-heading">{stripped[4:]}</h3>\n'
        elif stripped.startswith("## "):
            html_content += f'<h3 class="sub-heading" style="font-size: 18px; color: #1B365D;">{stripped[3:]}</h3>\n'
        elif stripped.startswith("# "):
            continue
        elif stripped.startswith("- ") or stripped.startswith("* "):
            item = stripped[2:]
            item = re.sub(r"\*\*([^\*]+)\*\*", r"<strong>\1</strong>", item)
            item = re.sub(r"`([^`]+)`", r"<code>\1</code>", item)
            html_content += f"<ul><li>{item}</li></ul>\n"
        elif stripped.startswith("> "):
            quote = stripped[2:]
            quote = re.sub(r"\*\*([^\*]+)\*\*", r"<strong>\1</strong>", quote)
            html_content += f"<blockquote>{quote}</blockquote>\n"
        else:
            p = stripped
            p = re.sub(r"\*\*([^\*]+)\*\*", r"<strong>\1</strong>", p)
            p = re.sub(r"`([^`]+)`", r"<code>\1</code>", p)
            p = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', p)
            html_content += f"<p>{p}</p>\n"

html_content += """
  </div>
</body>
</html>
"""

html_path = os.path.join(base_dir, "Phase3_Report.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"Saved: {html_path}")
print("Report compilation complete!")
