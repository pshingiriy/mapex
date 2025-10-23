import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Company {
  id: string;
  name: string;
  ownership: string;
  children?: Company[];
}

const organizationData: Company = {
  id: '1',
  name: 'Parent Company',
  ownership: '',
  children: [
    {
      id: '2',
      name: 'Sub Company 1',
      ownership: '100%',
      children: [
        { id: '2-1', name: 'Company 1', ownership: '85.5%' },
        { id: '2-2', name: 'Company 2', ownership: '92.3%' },
        { id: '2-3', name: 'Company 3', ownership: '67.8%' },
      ],
    },
    {
      id: '3',
      name: 'Sub Company 2',
      ownership: '100%',
      children: [
        { id: '3-1', name: 'Company 4', ownership: '75.2%' },
        { id: '3-2', name: 'Company 5', ownership: '88.9%' },
        { id: '3-3', name: 'Company 6', ownership: '95.1%' },
        { id: '3-4', name: 'Company 7', ownership: '61.4%' },
      ],
    },
    {
      id: '4',
      name: 'Sub Company 3',
      ownership: '100%',
      children: [
        { id: '4-1', name: 'Company 8', ownership: '73.6%' },
        { id: '4-2', name: 'Company 9', ownership: '82.7%' },
        { id: '4-3', name: 'Company 10', ownership: '90.5%' },
      ],
    },
  ],
};

interface TreeNodeProps {
  company: Company;
  level: number;
  isLast?: boolean;
}

const TreeNode = ({ company, level, isLast }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const hasChildren = company.children && company.children.length > 0;

  return (
    <div className="relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start gap-2">
          {level > 0 && (
            <div className="flex items-center pt-6">
              <div className="w-12 border-t border-dashed border-muted-foreground/40" />
            </div>
          )}
          
          <div className="flex-1">
            <CollapsibleTrigger asChild>
              <div
                className={`
                  px-6 py-4 rounded-lg border-2 backdrop-blur-sm cursor-pointer
                  transition-all duration-200 hover:border-primary/50
                  ${level === 0 ? 'bg-primary/20 border-primary/50' : 'bg-secondary/30 border-border'}
                  ${hasChildren ? 'hover:bg-secondary/40' : ''}
                `}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {hasChildren && (
                      <div className="text-muted-foreground">
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold text-foreground">{company.name}</div>
                      {company.ownership && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Ownership: {company.ownership}
                        </div>
                      )}
                    </div>
                  </div>
                  {hasChildren && (
                    <div className="text-xs text-muted-foreground">
                      {company.children!.length} {company.children!.length === 1 ? 'subsidiary' : 'subsidiaries'}
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleTrigger>

            {hasChildren && (
              <CollapsibleContent>
                <div className="ml-8 mt-4 space-y-3 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-muted-foreground/40" />
                  {company.children!.map((child, index) => (
                    <TreeNode
                      key={child.id}
                      company={child}
                      level={level + 1}
                      isLast={index === company.children!.length - 1}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            )}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export const OrganizationTree = () => {
  return (
    <div className="w-full bg-dashboard-bg rounded-lg border border-border p-8 overflow-auto max-h-[calc(100vh-180px)]">
      <TreeNode company={organizationData} level={0} />
    </div>
  );
};
