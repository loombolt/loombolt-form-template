"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Response {
  id: number;
  name: string;
  email: string;
  experience: string;
  features: string[];
  feedback: string;
  created_at: string;
}

interface ResultsTableProps {
  responses: Response[];
}

export function ResultsTable({ responses }: ResultsTableProps) {
  const getExperienceBadgeVariant = (experience: string) => {
    switch (experience.toLowerCase()) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'default';
      case 'average':
        return 'secondary';
      case 'poor':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Experience', 'Features', 'Feedback', 'Submitted At'];
    const rows = responses.map(response => [
      response.id,
      response.name,
      response.email,
      response.experience,
      Array.isArray(response.features) ? response.features.join(', ') : '',
      response.feedback,
      new Date(response.created_at).toISOString()
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    csvContent += rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "questionnaire_responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Questionnaire Submissions</CardTitle>
          <CardDescription>A total of {responses.length} responses have been recorded.</CardDescription>
        </div>
        <Button onClick={exportToCSV} variant="outline" size="sm" className="ml-auto gap-1">
          <Download className="h-4 w-4" />
          <span>Export to CSV</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="hidden md:table-cell">Feedback</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id}>
                <TableCell className="font-medium">{response.name}</TableCell>
                <TableCell>{response.email}</TableCell>
                <TableCell>
                  <Badge variant={getExperienceBadgeVariant(response.experience)}>
                    {response.experience}
                  </Badge>
                </TableCell>
                <TableCell>{Array.isArray(response.features) ? response.features.join(', ') : ''}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">{response.feedback}</TableCell>
                <TableCell className="text-right hidden sm:table-cell">{new Date(response.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
