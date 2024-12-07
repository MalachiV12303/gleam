import React from 'react'
import { useFilters } from '@/app/lib/searchParams'
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@nextui-org/react'
import { filtermap } from '@/app/lib/utils'
import { PriceSlider } from './priceslider'

export function Filters({ it }: { it: string }) {
    return it === 'cam' ? <CameraFilters></CameraFilters> :
        it === 'len' ? <LenseFilters></LenseFilters> :
        it === 'aer' ? <div>in progress</div> :
        <div>filters not found</div>
}

function CameraFilters() {
    const [{ type, brand, res, shutter, mgp }] = useFilters()
    return (
        <Accordion isCompact={true}>
            <AccordionItem key="price" aria-label="price" title="price">
                <PriceSlider />
            </AccordionItem>
            <AccordionItem key="type" aria-label="type" title="type">
                <FilterSet filters={filtermap.get('cameratypes')} param={type} p={'type'} />
            </AccordionItem>
            <AccordionItem key="brand" aria-label="brand" title="brand">
                <FilterSet filters={filtermap.get('camerabrands')} param={brand} p={'brand'} />
            </AccordionItem>
            <AccordionItem key="res" aria-label="res" title="res">
                <FilterSet filters={filtermap.get('res')} param={res} p={'res'}/>
            </AccordionItem>
            <AccordionItem key="shutter" aria-label="shutter" title="shutter">
                <FilterSet filters={filtermap.get('shutter')} param={shutter} p={'shutter'}/>
            </AccordionItem>
            <AccordionItem key="mgp" aria-label="mgp" title="mgp">
                <FilterSet filters={filtermap.get('megapixels')} param={mgp} p={'mgp'}/>
            </AccordionItem>
        </Accordion>
    )
}

function LenseFilters() {
    const [{ type, brand }] = useFilters()
    return (
        <Accordion isCompact={true}>
            <AccordionItem key="type" aria-label="type" title="type">
                <FilterSet filters={filtermap.get('lensetypes')} param={type} p={'type'} />
            </AccordionItem>
            <AccordionItem key="brands" aria-label="brands" title="brands">
                <FilterSet filters={filtermap.get('lensebrands')} param={brand} p={'brand'}/>
            </AccordionItem>
        </Accordion>
    )
}


function FilterSet({ filters, param, p }: { filters: string[] | undefined, param: string[], p: string }) {
    const [, setFilters] = useFilters()
    return (
        <CheckboxGroup
            aria-label={p}
            size="sm"
            classNames={{ wrapper: "text-background" }}
            color="primary"
            value={param}
            onValueChange={(e) => setFilters({ [p]: e })}
        >
            {filters?.map((fil) => (
                <Checkbox key={fil} value={fil}>{fil}</Checkbox>
            ))}
        </CheckboxGroup>
    )
}